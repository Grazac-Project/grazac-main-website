import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";
import { IoIosArrowBack } from "react-icons/io";
import "./BookSpace/BookSpace.css";
import people from "../images/workspace/people-2.png"
import backIcon from "../images/workspace/arrowleft.png";

const BookingSummary = () => {
  const location = useLocation();
  const history = useHistory();
  const [isloading, setIsLoading] = useState(false);

  // Retrieve data passed from BookSpace
  // Use defaults to prevent errors if direct access happens (though we redirect)
  const state = location.state || {};
  const {
    userInfo = {},
    selectedPaymentOption,
    startDate,
    endDate,
    showModal // 'id' or 'generate'
  } = state;

  // Redirect back if no data (e.g., direct access) using useEffect
  useEffect(() => {
    if (!location.state) {
      history.push("/bookSpace");
    }
  }, [location.state, history]);

  // Always compute or use defaults so hook can run unconditionally
  const totalAmount = selectedPaymentOption ? selectedPaymentOption.amount : 0;
  const url = "https://grazac-academy-back-end-ej7s.onrender.com/api/v1/user/book";

  // Provide safe defaults for the config object
  const SpaceFeeFlutterwaveConfig = {
    public_key: "FLWPUBK-006bdc82ad878f1518af32f44af6478f-X",
    tx_ref: Date.now(),
    amount: totalAmount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: userInfo.email || "",
      phonenumber: userInfo.phoneNumber || "",
      name: `${userInfo.firstName || ""} ${userInfo.lastName || ""}`,
    },
    customizations: {
      title: "Grazac Technologies Limited",
      description: "Co-working Space Payment",
      logo: "https://grazac.com.ng/logo.png",
    },
  };

  // call hook unconditionally
  const HandleSpacePayFlutterPayment = useFlutterwave(SpaceFeeFlutterwaveConfig);

  // If no state, we return null to render nothing while redirecting
  if (!location.state) {
    return null;
  }

  const handlePayment = async () => {
    setIsLoading(true);

    const dataValues = {
      ...userInfo,
      startDate: startDate, // Assuming startDate is already string if processed, or Date obj
      // Note: in BookSpace it was `startDate.toLocaleDateString()` before nav
      subscriptionType: selectedPaymentOption?.value || "",
    };

    // Note: The logic in BookSpace handled 'id' vs 'generate' slightly differently for backend
    // 'id' mode only sent code, startDate, subscriptionType.
    // We should replicate that payload structure construction here or rely on what was passed.

    // Let's ensure we construct the payload exactly as the backend expects based on showModal type.
    let payload = {};
    if (showModal === "id") {
      payload = {
        code: userInfo.code,
        startDate: startDate,
        subscriptionType: selectedPaymentOption?.value || "",
      }
    } else {
      payload = {
        ...userInfo,
        startDate: startDate,
        subscriptionType: selectedPaymentOption?.value || "",
      }
    }

    try {
      const res = await axios.post(url, payload);
      if (res.status === 201 || res.status === 200) {
        if (showModal === "generate") {
          toast.info(
            "Success, an ID has been generated successfully and sent to your email",
            {
              position: "bottom-right",
              style: {
                color: "#461199",
                fontWeight: "500",
                textAlign: "center",
                fontStyle: "italic",
                fontSize: "14px",
                fontText: "inter",
              },
            }
          );
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }

        // Trigger Payment
        HandleSpacePayFlutterPayment({
          callback: (response) => {
            console.log(response);
            if (response.status === "completed") {
              toast.success("Payment successful! Verifying payment...");
            }
            closePaymentModal();
            setTimeout(() => {
              history.push("/");
            }, 2500);
          },
          onClose: () => {
            console.log("Payment closed");
            setIsLoading(false); // Reset loading if closed without pay
          },
        });
      } else {
        setIsLoading(false);
        toast.error("Submission not successful");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("An error occurred while submitting");
    }
  };

  return (
    <div className="basicModal_space">
      <ToastContainer />
      <img src={people} alt="people" className="people-image" />
      <div className="right-side-content">
        <div className="book-space-header">
          <img src={backIcon} alt="back" onClick={() => history.goBack()} className="back-icon" />
          <h2>Summary</h2>
        </div>
        <p className="para">
          Grazac Workspace gives you access to exclusive discounts and allows for faster booking in the future
        </p>

        <div className="summary-details">
          {selectedPaymentOption?.value === "custom" || (state.customDates && state.customDates.length > 0) ? (
            // Custom Plan Layout
            <>
              <div className="summary-item">
                 <h5>Username/Email</h5>
                    <p>{userInfo.email}</p>
              </div>

              <div className="summary-item">
                <h5>Subscription Type</h5>
                <p>{selectedPaymentOption?.label}</p>
              </div>

              <div className="summary-item">
                <h5>Total Days Selected</h5>
                <p>{state.customDates ? state.customDates.length : 0} days</p>
              </div>

              <div className="summary-item total-section">
                <h5>Total Amount</h5>
                <p>₦{totalAmount.toLocaleString()}</p>
              </div>

              <div className="summary-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <h5>Selected Dates</h5>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                  {state.customDates && state.customDates.map((dateString, index) => {
                    // Parse YYYY-MM-DD safely to local time
                    const [year, month, day] = dateString.split('-').map(Number);
                    const dateObj = new Date(year, month - 1, day);
                    const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'short' });

                    return (
                      <span key={index} style={{
                        background: '#FFFFFF',
                        padding: '8px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        color: "#292D32",
                        fontWeight: "600",
                        border: "1px solid #EAEAEA"
                      }}>
                        {weekday}, {dateString}
                      </span>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            // Standard Layout (Daily, Weekly, Monthly, etc.)
            <>
              <div className="summary-item">
                {showModal === "id" ? (
                  <>
                    <h5>Username/Email</h5>
                    <p>{userInfo.code}</p>
                  </>
                ) : (
                  <>
                    <h5>Full Name</h5>
                    <p>{userInfo.firstName} {userInfo.lastName}</p>
                  </>
                )}
              </div>

              <div className="summary-item">
                <h5>Subscription Type</h5>
                <p>{selectedPaymentOption?.label}</p>
              </div>

              <div className="summary-item total-section">
                <h5>Total Amount</h5>
                <p>₦{totalAmount.toLocaleString()}</p>
              </div>

              <div className="summary-item">
                <h5>Start Date</h5>
                <p>{startDate}</p>
              </div>

              <div className="summary-item">
                <h5>End Date</h5>
                <p>{endDate || "N/A"}</p>
              </div>
            </>
          )}
        </div>

        {isloading ? (
          <div className="loader">
            <Loader />
          </div>
        ) : (
          <button
            onClick={handlePayment}
            className="basicModal_button"
            style={{ marginTop: "32px" }}
          >
            Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingSummary;
