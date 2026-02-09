import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";
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
  const url = "https://grazac-academy-back-end-ej7s.onrender.com/api/v1/user/book-space";

  // Provide safe defaults for the config object
  const SpaceFeeFlutterwaveConfig = {
    public_key: "FLWPUBK-b765ab41a14a9a8258992eafe205259f-X",
    tx_ref: Date.now(),
    amount: totalAmount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: userInfo.email || userInfo.code || "",
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

//   const handlePayment = async () => {
//   if (isLoading) return; // prevent double click
//   setIsLoading(true);

//   const txRef = `tx-${Date.now()}-${Math.floor(Math.random() * 100000)}`;

//   try {
//     const res = await axios.post(url, payload);

//     if (res.status === 200 || res.status === 201) {
//       HandleSpacePayFlutterPayment({
//         tx_ref: txRef, // ✅ NEW per click
//         callback: (response) => {
//           console.log(response);

//           if (response.status === "completed") {
//             toast.success("Payment successful! Verifying payment...");

//             sessionStorage.removeItem("bookSpace_showModal");
//             sessionStorage.removeItem("bookSpace_selectedPaymentOption");
//             sessionStorage.removeItem("bookSpace_startDate");
//             sessionStorage.removeItem("bookSpace_endDate");
//             sessionStorage.removeItem("bookSpace_summary");
//             sessionStorage.removeItem("bookSpace_userInfo");
//           }

//           closePaymentModal();
//           setIsLoading(false);

//           setTimeout(() => {
//             history.push("/");
//           }, 2500);
//         },
//         onClose: () => {
//           console.log("Payment closed");
//           setIsLoading(false);
//         },
//       });
//     } else {
//       setIsLoading(false);
//       toast.error("Submission not successful");
//     }
//   } catch (error) {
//     setIsLoading(false);
//     toast.error("An error occurred while submitting");
//   }
// };

  const handlePayment = async () => {
    setIsLoading(true);
    let payload = {};
    if (showModal === "id") {
      payload = {
        email: userInfo.code,
        startDate: startDate,
        subscriptionType: selectedPaymentOption?.label || "Custom",
        customDates: state.customDates || [],
      }
    } else {
      payload = {
        ...userInfo,
        startDate: startDate,
        subscriptionType: selectedPaymentOption?.label || "Custom",
        customDates: state.customDates || [],
      }
    }

    try {
      const res = await axios.post(url, payload);
      if (res.status === 201 || res.status === 200) {
        // Trigger Payment
        HandleSpacePayFlutterPayment({
          callback: (response) => {
            console.log(response);
            if (response.status === "completed") {
              toast.success("Payment successful! Verifying payment...");
              // Clear stored form data
              sessionStorage.removeItem("bookSpace_showModal");
              sessionStorage.removeItem("bookSpace_selectedPaymentOption");
              sessionStorage.removeItem("bookSpace_startDate");
              sessionStorage.removeItem("bookSpace_endDate");
              sessionStorage.removeItem("bookSpace_summary");
              sessionStorage.removeItem("bookSpace_userInfo");
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
      const errorMessage = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "An error occurred while submitting";
      toast.error(errorMessage);
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
