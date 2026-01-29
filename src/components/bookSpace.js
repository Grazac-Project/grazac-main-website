import React, { useEffect, useState, useCallback } from "react";
import calendar from "../images/calendar.png";
// import dropdown from "../images/drop-icon.svg";
import "./BookSpace/BookSpace.css";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
// import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import Loader from "./Loader";
import { useHistory } from "react-router-dom"; // Import useHistory
import workspace from "../images/workspace/workspace.png";
import returningUser from "../images/workspace/returning-user.png";
import firstTimeUser from "../images/workspace/first-time-user.png";
import backIcon from "../images/workspace/arrowleft.png";
import joy from "../images/workspace/joy-img.png";

const paymentOptions = [
  { label: "Daily", value: "daily", amount: 3000 },
  { label: "Weekly", value: "weekly", amount: 15000 },
  { label: "Monthly", value: "monthly", amount: 60000 },
  { label: "Quarterly", value: "quarterly", amount: 165000 },
  { label: "Yearly", value: "yearly", amount: 600000 },
];

const getDayWithSuffix = (day) => {
  if (day >= 11 && day <= 13) {
    return `${day}th`;
  }
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
};

const BookSpace = () => {
  const today = new Date();
  const history = useHistory(); // Use history for navigation

  const [showModal, setShowModal] = useState("id");
  const [toggle, setToggle] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(null);
  const [summary, setSummary] = useState([]);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    code: "",
  });

  // const modalRef = useRef();

  const formatDateWithSuffix = useCallback((date) => {
    const day = date.getDate();
    const dayWithSuffix = getDayWithSuffix(day);
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.toLocaleString("en-US", { year: "numeric" });

    return `${dayWithSuffix} ${month} ${year} `;
  }, []);

  const updateSummary = useCallback((paymentOption, startDateParam, endDateParam) => {
    if (!paymentOption || !startDateParam || !endDateParam) return;
    setEndDate(formatDateWithSuffix(endDateParam)); // Save formatted end date


    setSummary([
      { label: "Subscription Type", value: paymentOption.label },
      { label: "Start date", value: formatDateWithSuffix(startDateParam) },
      { label: "End date", value: formatDateWithSuffix(endDateParam) },
      {
        label: "Total price",
        value: `₦${paymentOption.amount.toLocaleString()}`,
      },
    ]);
  }, [formatDateWithSuffix]);

  const updateEndDateAndSummary = useCallback((start, option) => {
    if (!start || !option) return;

    const calculatedEndDate = new Date(start);

    switch (option.value) {
      case "yearly":
        calculatedEndDate.setDate(calculatedEndDate.getDate() + 365);
        break;
      case "monthly":
        calculatedEndDate.setDate(calculatedEndDate.getDate() + 31);
        break;
      case "quarterly":
        calculatedEndDate.setDate(calculatedEndDate.getDate() + 91);
        break;
      case "weekly":
        calculatedEndDate.setDate(calculatedEndDate.getDate() + 7);
        break;
      case "daily":
        calculatedEndDate.setDate(calculatedEndDate.getDate());
        break;
      default:
        break;
    }

    // Update summary directly without storing endDate in state
    updateSummary(option, start, calculatedEndDate);
  }, [updateSummary]);

  // Removed handleClickOutside useEffect since it's a page now

  useEffect(() => {
    if (selectedPaymentOption) {
      updateEndDateAndSummary(startDate, selectedPaymentOption);
    }
  }, [startDate, selectedPaymentOption, updateEndDateAndSummary]);

  const handleToggle = (e) => {
    e.stopPropagation();
    setToggle(!toggle);
    setToggle2(false);
  };

  const handleToggle2 = (e) => {
    e.stopPropagation();
    setToggle2(!toggle2);
    setToggle(false);
  };

  const handlePaymentOptionChange = (option) => {
    setSelectedPaymentOption(option);
    setToggle(false);
  };

  const handleStartDateChange = (newStartDate) => {
    setStartDate(newStartDate);
    setToggle2(false);
  };

  const handleCustomDateClick = (e) => {
    e.stopPropagation();
    setSelectedPaymentOption({ value: "custom", label: "Custom", amount: 0 }); // Set a dummy option for custom
    setToggle2(!toggle2); // Toggle calendar
    setToggle(false);
  };


  const tileDisabled = ({ date, view }) => {
    if (view === "month") {
      const day = date.getDay();
      return date < new Date() || day === 0 || day === 7;
    }
    return false;
  };

  const totalAmount = selectedPaymentOption ? selectedPaymentOption.amount : 0;
  const url =
    "https://grazac-academy-back-end-ej7s.onrender.com/api/v1/user/book";

  const SpaceFeeFlutterwaveConfig = {
    public_key: "FLWPUBK-006bdc82ad878f1518af32f44af6478f-X",
    tx_ref: Date.now(),
    amount: totalAmount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: userInfo.email,
      phonenumber: userInfo.phoneNumber,
      name: `${userInfo.firstName} ${userInfo.lastName}`,
    },
    customizations: {
      title: "Grazac Technologies Limited",
      description: "Co-working Space Payment",
      logo: "https://grazac.com.ng/logo.png",
    },
  };

  const HandleSpacePayFlutterPayment = useFlutterwave(
    SpaceFeeFlutterwaveConfig
  );

  const formik = useFormik({
    initialValues: userInfo,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      history.push("/booking-summary", {
        userInfo: values,
        selectedPaymentOption,
        startDate: startDate.toLocaleDateString(),
        endDate: endDate,
        showModal
      });
      setSubmitting(false);
    },
  });

  useEffect(() => {
    setUserInfo(formik.values);
  }, [formik.values]);

  return (
    <>
      {/* Removed basicModal_overlay */}
      <div className="basicModal_space">
        <div className="left-side-content">
          <img src={showModal === "generate" ? joy : workspace} alt="" />
        </div>

        <div className="right-side-content">
          <div className="book-space-header">
            <img src={backIcon} alt="" onClick={() => history.goBack()} className="back-icon" />
            <h2>Book a Space</h2>
          </div>
          <p className="para">
            Grazac Workspace gives you access to exclusive discounts and allows for faster booking in the future
          </p>

          <div className="workspace_id">
            <h1>
              User type
            </h1>
            <div className="workspace_id_buttons">
              <div
                className={`workspace_id_button ${showModal === "id" ? "active" : ""
                  }`}
                onClick={() => setShowModal("id")} >
                <img src={returningUser} alt="" />
                <p>Returning User</p>
              </div>

              <div
                className={`workspace-button2 ${showModal === "generate" ? "active" : ""
                  }`}
                onClick={() => setShowModal("generate")}
              >
                <img src={firstTimeUser} alt="" />
                <p>First Time User</p>
              </div>
            </div>
          </div>

          <form
            className="basicModal_form"
            id="bookingForm"
            onSubmit={formik.handleSubmit}
          >
            {showModal === "id" && (
              <div>
                <label>Email Address or Username</label>
                <input
                  type="text"
                  required
                  placeholder="johndoe@gmail.com"
                  name="code"
                  onChange={formik.handleChange}
                  value={formik.values.code}
                />
              </div>
            )}

            {showModal === "generate" && (
              <>
                <label>Email Address</label>
                <input
                  type="text"
                  required
                  placeholder="johndoe@gmail.com"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                <label>Username (set your preferred username)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g Nancy_first"
                  name="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
                <label>Phone Number</label>
                <input
                  type="tel"
                  pattern="[0-9]{11}"
                  required
                  placeholder="Enter 11 digits phone number"
                  name="phoneNumber"
                  onChange={formik.handleChange}
                  value={formik.values.phoneNumber}
                />
                <div className="basicModal_form_flex">
                  <div className="basicModal_form_flex_input">
                    <label>First Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter First Name"
                      name="firstName"
                      onChange={formik.handleChange}
                      value={formik.values.firstName}
                    />
                  </div>

                  <div className="basicModal_form_flex_input">
                    <label>Last Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter Last Name"
                      name="lastName"
                      onChange={formik.handleChange}
                      value={formik.values.lastName}
                    />
                  </div>
                </div>
              </>
            )}
          </form>
          <p className="sub-type">
            {selectedPaymentOption
              ? selectedPaymentOption.label
              : "Subscription Type"}
          </p>
          <div className="basicModal_Container">
            <div className="basicModal_dateContainer">
              <div
                className="basicModal_dateContainer_start"
              // onClick={handleToggle}
              >
                <div className="subscription_type">
                  {paymentOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`subscription-option ${selectedPaymentOption?.value === option.value ? "active" : ""
                        }`}
                      onClick={() => handlePaymentOptionChange(option)}
                    >
                      {option.label} <br />
                      <span>₦{option.amount.toLocaleString()}</span>
                    </div>
                  ))}
                  <div
                    className={`subscription-option ${selectedPaymentOption?.value === "custom" ? "active" : ""
                      }`}
                    onClick={handleCustomDateClick}
                  >
                    Custom
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div>
            <h1 className="start-date">Start Date</h1>
          </div>
          <div
            className="basicModal_dateContainer_end"
            onClick={handleToggle2}
          >
            {summary.length === 4 ? (
              <p> {formatDateWithSuffix(startDate)}</p>
            ) : (
              <p>Select Date</p>
            )}
            <div>
              <img src={calendar} alt="calendar" />
            </div>
          </div>

          <div className="basicModal_sub">
            {toggle && (
              <div className="basicModal_sub_con">
                {paymentOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handlePaymentOptionChange(option)}
                    className="basicModal_sub_conFlex"
                  >
                    <p>{option.label}</p>
                    <h5>₦{option.amount.toLocaleString()}</h5>
                  </div>
                ))}
              </div>
            )}
            {toggle2 && (
              <div className="calendar">
                <Calendar
                  onChange={handleStartDateChange}
                  value={startDate}
                  tileDisabled={tileDisabled}
                  prev2Label={null}
                  next2Label={null}
                />
              </div>
            )}
          </div>
          <div>
            <p className="workspaceinfo">Grazac Workspace gives you access to exclusive discounts and allows for faster booking in the future</p>
          </div>
          {/* <div className="basicModal_summary">
            {summary.length === 4 && (
              <>
                <h5>Summary</h5>
                {summary.map((item, index) => (
                  <div key={index} className="basicModal_summary_flex">
                    <h5>{item.label}</h5>
                    <p>{item.value}</p>
                  </div>
                ))}
              </>
            )}
          </div> */}

          {isloading ? (
            <div className="loader">
              <Loader />
            </div>
          ) : (
            <button
              type="submit"
              form="bookingForm"
              className="basicModal_button"
            >
              Book Now
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default BookSpace;










// import React, { useEffect, useRef, useState, useCallback } from "react";
// import calendar from "../images/calendar.png";
// import dropdown from "../images/drop-icon.svg";
// import "./BookSpace/BookSpace.css";
// import "react-calendar/dist/Calendar.css";
// import Calendar from "react-calendar";
// import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useFormik } from "formik";
// import Loader from "./Loader";
// // import { AiOutlineClose } from "react-icons/ai";
// import { useHistory } from "react-router-dom"; // Import useHistory
// import workspace from "../images/workspace/workspace.png";
// import returningUser from "../images/workspace/returning-user.png";
// import firstTimeUser from "../images/workspace/first-time-user.png";

// const paymentOptions = [
//   { label: "Daily", value: "daily", amount: 3000 },
//   { label: "Weekly", value: "weekly", amount: 15000 },
//   { label: "Monthly", value: "monthly", amount: 60000 },
//   { label: "Quarterly", value: "quarterly", amount: 165000 },
//   { label: "Yearly", value: "yearly", amount: 600000 },
// ];

// const getDayWithSuffix = (day) => {
//   if (day >= 11 && day <= 13) {
//     return `${day}th`;
//   }
//   switch (day % 10) {
//     case 1:
//       return `${day}st`;
//     case 2:
//       return `${day}nd`;
//     case 3:
//       return `${day}rd`;
//     default:
//       return `${day}th`;
//   }
// };

// const BookSpace = () => {
//   const today = new Date();
//   const history = useHistory(); // Use history for navigation

//   const [showModal, setShowModal] = useState("id");
//   const [toggle, setToggle] = useState(false);
//   const [toggle2, setToggle2] = useState(false);
//   const [isloading, setIsLoading] = useState(false);
//   const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);
//   const [startDate, setStartDate] = useState(today);
//   const [summary, setSummary] = useState([]);
//   const [userInfo, setUserInfo] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phoneNumber: "",
//     code: "",
//   });

//   const modalRef = useRef();

//   const formatDateWithSuffix = useCallback((date) => {
//     const day = date.getDate();
//     const dayWithSuffix = getDayWithSuffix(day);
//     const month = date.toLocaleString("en-US", { month: "long" });
//     const year = date.toLocaleString("en-US", { year: "numeric" });

//     return `${dayWithSuffix} ${month} ${year} `;
//   }, []);

//   const updateSummary = useCallback((paymentOption, startDateParam, endDateParam) => {
//     if (!paymentOption || !startDateParam || !endDateParam) return;

//     setSummary([
//       { label: "Subscription Type", value: paymentOption.label },
//       { label: "Start date", value: formatDateWithSuffix(startDateParam) },
//       { label: "End date", value: formatDateWithSuffix(endDateParam) },
//       {
//         label: "Total price",
//         value: `₦${paymentOption.amount.toLocaleString()}`,
//       },
//     ]);
//   }, [formatDateWithSuffix]);

//   const updateEndDateAndSummary = useCallback((start, option) => {
//     if (!start || !option) return;

//     const calculatedEndDate = new Date(start);

//     switch (option.value) {
//       case "yearly":
//         calculatedEndDate.setDate(calculatedEndDate.getDate() + 365);
//         break;
//       case "monthly":
//         calculatedEndDate.setDate(calculatedEndDate.getDate() + 31);
//         break;
//       case "quarterly":
//         calculatedEndDate.setDate(calculatedEndDate.getDate() + 91);
//         break;
//       case "weekly":
//         calculatedEndDate.setDate(calculatedEndDate.getDate() + 7);
//         break;
//       case "daily":
//         calculatedEndDate.setDate(calculatedEndDate.getDate());
//         break;
//       default:
//         break;
//     }

//     // Update summary directly without storing endDate in state
//     updateSummary(option, start, calculatedEndDate);
//   }, [updateSummary]);

//   // Removed handleClickOutside useEffect since it's a page now

//   useEffect(() => {
//     if (selectedPaymentOption) {
//       updateEndDateAndSummary(startDate, selectedPaymentOption);
//     }
//   }, [startDate, selectedPaymentOption, updateEndDateAndSummary]);

//   const handleToggle = (e) => {
//     e.stopPropagation();
//     setToggle(!toggle);
//     setToggle2(false);
//   };

//   const handleToggle2 = (e) => {
//     e.stopPropagation();
//     setToggle2(!toggle2);
//     setToggle(false);
//   };

//   const handlePaymentOptionChange = (option) => {
//     setSelectedPaymentOption(option);
//     setToggle(false);
//   };

//   const handleStartDateChange = (newStartDate) => {
//     setStartDate(newStartDate);
//     setToggle2(false);
//   };

//   const tileDisabled = ({ date, view }) => {
//     if (view === "month") {
//       const day = date.getDay();
//       return date < new Date() || day === 0 || day === 7;
//     }
//     return false;
//   };

//   const totalAmount = selectedPaymentOption ? selectedPaymentOption.amount : 0;
//   const url =
//     "https://grazac-academy-back-end-ej7s.onrender.com/api/v1/user/book";

//   const SpaceFeeFlutterwaveConfig = {
//     public_key: "FLWPUBK-006bdc82ad878f1518af32f44af6478f-X",
//     tx_ref: Date.now(),
//     amount: totalAmount,
//     currency: "NGN",
//     payment_options: "card,mobilemoney,ussd",
//     customer: {
//       email: userInfo.email,
//       phonenumber: userInfo.phoneNumber,
//       name: `${userInfo.firstName} ${userInfo.lastName}`,
//     },
//     customizations: {
//       title: "Grazac Technologies Limited",
//       description: "Co-working Space Payment",
//       logo: "https://grazac.com.ng/logo.png",
//     },
//   };

//   const HandleSpacePayFlutterPayment = useFlutterwave(
//     SpaceFeeFlutterwaveConfig
//   );

//   const formik = useFormik({
//     initialValues: userInfo,
//     enableReinitialize: true,
//     onSubmit: async (values, { setSubmitting }) => {
//       let dataValues = {};
//       if (values.code) {
//         dataValues = {
//           code: values.code,
//           startDate: startDate.toLocaleDateString(),
//           subscriptionType: selectedPaymentOption?.value || "",
//         };
//       } else {
//         dataValues = {
//           ...values,
//           startDate: startDate.toLocaleDateString(),
//           subscriptionType: selectedPaymentOption?.value || "",
//         };
//       }
//       setIsLoading(true);
//       try {
//         const res = await axios.post(url, dataValues);
//         if (res.status === 201 || res.status === 200) {
//           if (showModal === "generate") {
//             toast.info(
//               "Success, an ID has been generated successfully and sent to your email",
//               {
//                 position: "bottom-right",
//                 style: {
//                   color: "#461199",
//                   fontWeight: "500",
//                   textAlign: "center",
//                   fontStyle: "italic",
//                   fontSize: "14px",
//                   fontText: "inter",
//                 },
//               }
//             );
//             await new Promise((resolve) => setTimeout(resolve, 5000));
//           }
//           HandleSpacePayFlutterPayment({
//             callback: (response) => {
//               console.log(response);
//               if (response.status === "completed") {
//                 toast.success("Payment successful! Verifying payment...");
//               }
//               closePaymentModal();
//               setTimeout(() => {
//                 history.push("/"); // Use history.push instead of window.location
//               }, 2500);
//             },
//             onClose: () => {
//               history.push("/");
//             },
//           });
//         } else {
//           setSubmitting(false);
//           setIsLoading(false);
//           toast.error("Form submission not successful");
//         }
//       } catch (error) {
//         setSubmitting(false);
//         setIsLoading(false);
//         toast.error("An error occurred while submitting the form");
//       } finally {
//         setSubmitting(false);
//         setIsLoading(false);
//       }
//     },
//   });

//   useEffect(() => {
//     setUserInfo(formik.values);
//   }, [formik.values]);

//   return (
//     <>
//       {/* Removed basicModal_overlay */}
//       <div className="basicModal_space" ref={modalRef} onClick={(e) => {
//         // Close drop downs if clicking outside
//         if (!e.target.closest(".basicModal_sub_con") && !e.target.closest(".calendar")) {
//           setToggle(false);
//           setToggle2(false);
//         }
//       }}>
//         <ToastContainer closeButton={false} />

//         <div>
//           <img src={workspace} alt="" />
//         </div>

//         <div>
//           <h2>Book a Space</h2>
//           <p className="para">
//             Grazac Workspace gives you access to exclusive discounts and allows for faster booking in the future
//           </p>

//           <div>
//             <h1 className="workspace_id">
//               User type
//             </h1>
//             <div className="workspace_id_buttons">
//               <button>
//                 <img src={returningUser} alt="" />
//                 <div
//                   className={`workspace-button1 ${showModal === "id" ? "active" : ""
//                     }`}
//                   onClick={() => setShowModal("id")}
//                 >
//                  Returning User
//                 </div>
//               </button>
//               <button>
//                 <img src={firstTimeUser} alt="" />
//                 <div
//                   className={`workspace-button2 ${showModal === "generate" ? "active" : ""
//                     }`}
//                   onClick={() => setShowModal("generate")}
//                 >
//                   First Time User
//                 </div>
//               </button>
//             </div>
//           </div>

//           <form
//             className="basicModal_form"
//             id="bookingForm"
//             onSubmit={formik.handleSubmit}
//           >
//             {showModal === "id" && (
//               <div
//               // style={{
//               //   display: "flex",
//               //   justifyContent: "center",
//               //   alignItems: "center",
//               //   height: "54px",
//               // }}
//               >
//                 <label>Email Address or Username</label>
//                 <input
//                   type="text"
//                   required
//                   placeholder="johndoe@gmail.com"
//                   name="code"
//                   onChange={formik.handleChange}
//                   value={formik.values.code}
//                   style={{ width: "251px" }}
//                 />
//               </div>
//             )}

//             {showModal === "generate" && (
//               <>
//                 <p>
//                   Kindly enter your information here to complete the process
//                 </p>
//                 <div className="basicModal_form_flex">
//                   <input
//                     type="text"
//                     required
//                     placeholder="Email Address"
//                     name="email"
//                     onChange={formik.handleChange}
//                     value={formik.values.email}
//                   />
//                   <input
//                     type="tel"
//                     pattern="[0-9]{11}"
//                     required
//                     placeholder="Phone Number"
//                     name="phoneNumber"
//                     onChange={formik.handleChange}
//                     value={formik.values.phoneNumber}
//                   />
//                 </div>
//                 <div className="basicModal_form_flex">
//                   <input
//                     type="text"
//                     required
//                     placeholder="First Name"
//                     name="firstName"
//                     onChange={formik.handleChange}
//                     value={formik.values.firstName}
//                   />
//                   <input
//                     type="text"
//                     required
//                     placeholder="Last Name"
//                     name="lastName"
//                     onChange={formik.handleChange}
//                     value={formik.values.lastName}
//                   />
//                 </div>
//               </>
//             )}
//           </form>
//           <div className="basicModal_Container">
//             <div className="basicModal_dateContainer">
//               <div
//                 className="basicModal_dateContainer_start"
//                 onClick={handleToggle}
//               >
//                 <p>
//                   {selectedPaymentOption
//                     ? selectedPaymentOption.label
//                     : "Subscription Type"}
//                 </p>
//                 <div>
//                   <img src={dropdown} alt="dropdown" />
//                 </div>
//               </div>
//               <div
//                 className="basicModal_dateContainer_end"
//                 onClick={handleToggle2}
//               >
//                 {summary.length === 4 ? (
//                   <p> {formatDateWithSuffix(startDate)}</p>
//                 ) : (
//                   <p>Start date</p>
//                 )}
//                 <div>
//                   <img src={calendar} alt="calendar" />
//                 </div>
//               </div>
//             </div>
//             <div className="basicModal_sub">
//               {toggle && (
//                 <div className="basicModal_sub_con">
//                   {paymentOptions.map((option) => (
//                     <div
//                       key={option.value}
//                       onClick={() => handlePaymentOptionChange(option)}
//                       className="basicModal_sub_conFlex"
//                     >
//                       <p>{option.label}</p>
//                       <h5>₦{option.amount.toLocaleString()}</h5>
//                     </div>
//                   ))}
//                 </div>
//               )}
//               {toggle2 && (
//                 <div className="calendar">
//                   <Calendar
//                     onChange={handleStartDateChange}
//                     value={startDate}
//                     tileDisabled={tileDisabled}
//                   />
//                 </div>
//               )}
//             </div>
//             <div className="basicModal_summary">
//               {summary.length === 4 && (
//                 <>
//                   <h5>Summary</h5>
//                   {summary.map((item, index) => (
//                     <div key={index} className="basicModal_summary_flex">
//                       <h5>{item.label}</h5>
//                       <p>{item.value}</p>
//                     </div>
//                   ))}
//                 </>
//               )}
//             </div>
//           </div>

//           {isloading ? (
//             <div className="loader">
//               <Loader />
//             </div>
//           ) : (
//             <button
//               type="submit"
//               form="bookingForm"
//               className="basicModal_button"
//             >
//               Book Now
//             </button>
//           )}
//           <p className="basicModal_workspaceInfo">
//             * Grazac Workspace ID gives you access to exclusive discounts and
//             allows for faster booking in the future
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BookSpace;