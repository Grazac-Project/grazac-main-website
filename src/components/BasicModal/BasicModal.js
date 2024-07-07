// import React, { useState } from "react";
// import calendar from "../../images/calendar.png";
// import dropdown from "../../images/drop-icon.svg";

// import "./BasicModal.css";
// import "react-calendar/dist/Calendar.css";
// import Calendar from "react-calendar";
// import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const BasicModal = ({ open, setOpen }) => {
//   const options = { day: "numeric", month: "short", year: "numeric" };
//   const [value] = useState(new Date());
//   const [hideCalendar, setHideCalendar] = useState(false);
//   const [hideCalendar2, setHideCalendar2] = useState(false);
//   const [startDate, setStartDate] = useState(
//     new Date().toLocaleDateString("en-US", options)
//   );
//   const [endDate, setEndDate] = useState(
//     new Date().toLocaleDateString("en-US", options)
//   );
//   const [userInfo, setUserInfo] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phoneNumber: "",
//   });
//   const data = new FormData();
//   data.set("firstName", userInfo.firstName);
//   data.set("lastName", userInfo.lastName);
//   data.set("email", userInfo.email);
//   data.set("phoneNumber", userInfo.phoneNumber);

//   const userLocale = navigator.language || "en-US";
//   const handleChange = (value) => {
//     const formattedDate = value.toLocaleDateString(userLocale, options);
//     const selectedStartDate = new Date(value);
//     const currentDate = new Date().setHours(0, 0, 0, 0);

//     if (selectedStartDate < currentDate) {
//       toast.error("Start date cannot be before the current date");
//     } else {
//       setStartDate(formattedDate);
//       setEndDate(formattedDate);
//       setHideCalendar(false);
//     }
//   };

//   const handleChange2 = (value) => {
//     setHideCalendar(false);
//     const formattedDate = value.toLocaleDateString(userLocale, options);
//     const selectedEndDate = new Date(value);
//     const selectedStartDate = new Date(startDate);

//     if (selectedEndDate < selectedStartDate) {
//       toast.error("End date cannot be before the start date");
//     } else {
//       setEndDate(formattedDate);
//       setHideCalendar2(false);
//     }
//   };

//   const formInputChange = (e) => {
//     setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
//   };

//   const calculateNumOfDays = () => {
//     const result = removeWeekends(startDate, endDate);
//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     data.set("startDate", start);
//     data.set("endDate", end);
//     // const timeDiff = Math.abs(end.getTime() - start.getTime());
//     // const numOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
//     const numOfDays = result.daysRemaining;
//     return numOfDays;
//   };

//   const totalAmount = 3000 * calculateNumOfDays();
//   const url =
//     "https://api-grazacacademy-0358136c0905.herokuapp.com/api/v1/user/bookSpace";

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

//   function removeWeekends(startDateStr, endDateStr) {
//     // Parse date strings to Date objects
//     const startDate = new Date(startDateStr);
//     const endDate = new Date(endDateStr);

//     const selectedDates = [];
//     let currentDate = new Date(startDate);
//     const endDateCopy = new Date(endDate);

//     // Generate the range of dates between start and end date
//     while (currentDate <= endDateCopy) {
//       selectedDates.push(new Date(currentDate));
//       currentDate.setDate(currentDate.getDate() + 1);
//     }

//     // Filter out weekends (Saturday and Sunday)
//     const filteredDates = selectedDates.filter((date) => {
//       const day = date.getDay();
//       return day !== 0 && day !== 6; // 0 is Sunday, 6 is Saturday
//     });

//     // Calculate the number of days remaining after removing weekends
//     const totalDays =
//       (endDateCopy - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1;
//     const daysRemaining = filteredDates.length;

//     return { filteredDates, daysRemaining, totalDays };
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.post(url, data).then((res) => {
//       if (res.data.status === 201) {
//         HandleSpacePayFlutterPayment({
//           callback: (response) => {
//             if (response.status === "completed") {
//               toast.success("Payment successful! Verifying payment...");
//             }
//             closePaymentModal();
//             setInterval(() => {
//               window.location = "/";
//             }, 2500);
//           },
//           onClose: () => {
//             window.location = "/";
//           },
//         });
//       } else {
//         toast.error("Form submission not successful");
//       }
//     });
//   };

//   return (
//     <>
//       <div className="basicModal_overlay" onClick={() => setOpen(false)}></div>
//       <div className="basicModal">
//         <div className="basicModal_space">
//           <ToastContainer closeButton={false} />
//           <div className="close" onClick={() => setOpen(false)}>
//             &times;
//           </div>
//           <h2>Book a Space</h2>
//           <p className="para">
//             You can now secure your booking for our space at just{" "}
//             <strike>₦5,000</strike> <span className="thirty">₦3,000</span> (10%
//             discount) naira daily, from <span>9 am to 5 pm</span>
//           </p>
//           <div className="basicModal_dateContainer">
//             <div
//               className="basicModal_dateContainer_start"
//               onClick={() => {
//                 setHideCalendar2(false);
//                 setHideCalendar(true);
//               }}
//             >
//               {/* <div>
//                 <img src={calendar} alt="" />
//               </div>
//               <div>
//                 <p>Start Date</p>
//                 <p className="start-date">{startDate}</p>
//               </div> */}
//               <p>Subscription Type</p>
//               <div>
//                 <img src={dropdown} alt="calendar" />
//               </div>
//             </div>
//             <div
//               className="basicModal_dateContainer_end"
//               //   onClick={() => {
//               //     setHideCalendar(false)
//               //     setHideCalendar2(true)
//               //   }
//               // }
//             >
//               {/* <div>
//                 <img src={calendar} alt="calendar" />
//               </div>
//               <div>
//                 <p>End Date</p>
//                 <p className="end-date">{endDate}</p>
//               </div> */}
//               <p>Start Date</p>
//               <div>
//                 <img src={calendar} alt="calendar" />
//               </div>
//             </div>
//           </div>
//           {/* <div className={`calendar ${hideCalendar ? "visible" : "hidden"}`}> */}
//           <div>
//             {/* {hideCalendar && <Calendar onChange={handleChange} value={value} />} */}
//             <div className="basicModal_sub_con">
//               <div className="basicModal_sub_conFlex">
//                 <p>Daily</p>
//                 <h5>₦4,000</h5>
//               </div>
//               <div className="basicModal_sub_conFlex">
//                 <p>Weekly</p>
//                 <h5>₦18,000</h5>
//               </div>
//               <div className="basicModal_sub_conFlex">
//                 <p>Monthly</p>
//                 <h5>₦40,000</h5>
//               </div>
//               <div className="basicModal_sub_conFlex">
//                 <p>Quaterly</p>
//                 <h5>₦130,000</h5>
//               </div>
//               <div className="basicModal_sub_conFlex">
//                 <p>Yearly</p>
//                 <h5>₦4,000</h5>
//               </div>
//             </div>
//           </div>
//           <div className={`calendar ${hideCalendar2 ? "visible" : "hidden"}`}>
//             {hideCalendar2 && (
//               <Calendar onChange={handleChange2} value={value} />
//             )}
//           </div>
//           {/* <div className="basicModal_price">
//             <p className="basicModal_price_label">Total Price:</p>
//             <p className="basicModal_price_total">
//               <p className="sum">₦{totalAmount.toLocaleString()}</p>
//               <p className="workings">₦3,000 x {calculateNumOfDays()} day(s)</p>
//             </p>
//           </div> */}
//           <form className="basicModal_form" onSubmit={handleSubmit}>
//             <p style={{ textAlign: "center", marginTop: "8px" }}>
//               Kindly enter your information here to complete the process
//             </p>
//             <div style={{ display: "flex", gap: "8px" }}>
//               <input
//                 type="text"
//                 required
//                 placeholder="Email Address"
//                 name="email"
//                 onChange={formInputChange}
//                 value={userInfo.email}
//               />
//               <input
//                 type="tel"
//                 required
//                 placeholder="Phone Number"
//                 name="phoneNumber"
//                 onChange={formInputChange}
//                 value={userInfo.phoneNumber}
//               />
//             </div>
//             <div style={{ display: "flex", gap: "8px" }}>
//               <input
//                 type="text"
//                 required
//                 placeholder="First Name"
//                 name="firstName"
//                 onChange={formInputChange}
//                 value={userInfo.firstName}
//               />
//               <input
//                 type="text"
//                 required
//                 placeholder="Last Name"
//                 name="lastName"
//                 onChange={formInputChange}
//                 value={userInfo.lastName}
//               />
//             </div>
//             <button type="submit">Book Now</button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BasicModal;
import React, { useEffect, useRef, useState } from "react";
import calendar from "../../images/calendar.png";
import dropdown from "../../images/drop-icon.svg";
import "./BasicModal.css";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import Loader from "../Loader";

const paymentOptions = [
  { label: "Daily", value: "daily", amount: 3000 },
  { label: "Weekly", value: "weekly", amount: 18000 },
  { label: "Monthly", value: "monthly", amount: 40000 },
  { label: "Quarterly", value: "quarterly", amount: 130000 },
  { label: "Yearly", value: "yearly", amount: 400000 },
];

const BasicModal = ({ open, setOpen }) => {
  // const options = { month: "long", day: "numeric" };
  const today = new Date();

  const [toggle, setToggle] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState("");
  const [summary, setSummary] = useState([]);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpen]);

  useEffect(() => {
    if (selectedPaymentOption) {
      updateEndDate(startDate, selectedPaymentOption);
    }
  }, [startDate, selectedPaymentOption]);

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

  const updateEndDate = (start, option) => {
    if (!start || !option) return;

    let endDate = new Date(start);

    switch (option.value) {
      case "yearly":
        endDate.setDate(endDate.getDate() + 365);
        break;
      case "monthly":
        endDate.setDate(endDate.getDate() + 31);
        break;
      case "quarterly":
        endDate.setDate(endDate.getDate() + 91);
        break;
      case "weekly":
        endDate.setDate(endDate.getDate() + 7);
        break;
      case "daily":
        endDate.setDate(endDate.getDate());
        break;
      default:
        break;
    }

    setEndDate(endDate);
    updateSummary(option, start, endDate);
  };

  const updateSummary = (paymentOption, startDate, endDate) => {
    if (!paymentOption || !startDate || !endDate) return;

    setSummary([
      { label: "Subscription Type", value: paymentOption.label },
      { label: "Start date", value: formatDateWithSuffix(startDate) },
      { label: "End date", value: formatDateWithSuffix(endDate) },
      {
        label: "Total price",
        value: `₦${paymentOption.amount.toLocaleString()}`,
      },
    ]);
  };

  const formatDateWithSuffix = (date) => {
    const day = date.getDate();
    const dayWithSuffix = getDayWithSuffix(day);
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.toLocaleString("en-US", { year: "numeric" });

    return `${dayWithSuffix} ${month} ${year} `;
  };

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

  const tileDisabled = ({ date, view }) => {
    if (view === "month") {
      // Disable weekends (Saturday and Sunday)
      const day = date.getDay();
      return date < new Date() || day === 0 || day === 6;
    }
    return false;
  };

  const totalAmount = selectedPaymentOption ? selectedPaymentOption.amount : 0;
  const url = "https://grazac-academy-back-end.onrender.com/api/v1/user/book";

  const SpaceFeeFlutterwaveConfig = {
    // public_key: "FLWPUBK-006bdc82ad878f1518af32f44af6478f-X",
    test_key: "FLWSECK_TEST-51320aadf079e5c4951bf2a6b9e92822-X",
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
      const dataValues = {
        ...values,
        startDate: startDate.toLocaleDateString(),
        subscriptionType: selectedPaymentOption?.value || "",
      };
      console.log(dataValues);
      setIsLoading(true);
      try {
        const res = await axios.post(url, dataValues);
        if (res.data.status === 201) {
          setIsLoading(true);
          HandleSpacePayFlutterPayment({
            callback: (response) => {
              if (response.status === "completed") {
                toast.success("Payment successful! Verifying payment...");
              }
              closePaymentModal();
              setTimeout(() => {
                window.location = "/";
              }, 2500);
            },
            onClose: () => {
              window.location = "/";
            },
          });
        } else {
          toast.error("Form submission not successful");
        }
      } catch (error) {
        toast.error("An error occurred while submitting the form");
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    setUserInfo(formik.values);
  }, [formik.values]);

  return (
    <>
      <div className="basicModal_overlay" onClick={() => setOpen(false)}></div>
      <div className="basicModal" ref={modalRef}>
        <div className="basicModal_space" onClick={(e) => e.stopPropagation()}>
          <ToastContainer closeButton={false} />
          <h2>Book a Space</h2>
          <p className="para">
            You can now secure your booking for our space at just{" "}
            <strike>₦5,000</strike> <span className="thirty">₦3,000</span> (10%
            discount) naira daily, from <span>9 am to 5 pm</span>
          </p>
          <div className="basicModal_Container">
            <div className="basicModal_dateContainer">
              <div
                className="basicModal_dateContainer_start"
                onClick={handleToggle}
              >
                <p>
                  {selectedPaymentOption
                    ? selectedPaymentOption.label
                    : "Subscription Type"}
                </p>
                <div>
                  <img src={dropdown} alt="dropdown" />
                </div>
              </div>
              <div
                className="basicModal_dateContainer_end"
                onClick={handleToggle2}
              >
                {summary.length === 4 ? (
                  <p> {formatDateWithSuffix(startDate)}</p>
                ) : (
                  <p>Start date</p>
                )}
                <div>

                  
                  <img src={calendar} alt="calendar" />
                </div>
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
                  />
                </div>
              )}
            </div>
            <div className="basicModal_summary">
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
            </div>
          </div>
          <form className="basicModal_form" onSubmit={formik.handleSubmit}>
            <p style={{ textAlign: "center", marginTop: "8px" }}>
              Kindly enter your information here to complete the process
            </p>
            <div className="basicModal_form_flex">
              <input
                type="text"
                required
                placeholder="Email Address"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <input
                type="tel"
                pattern="[0-9]{11}"
                required
                placeholder="Phone Number"
                name="phoneNumber"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
              />
            </div>
            <div className="basicModal_form_flex">
              <input
                type="text"
                required
                placeholder="First Name"
                name="firstName"
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />
              <input
                type="text"
                required
                placeholder="Last Name"
                name="lastName"
                onChange={formik.handleChange}
                value={formik.values.lastName}
              />
            </div>
            {isloading ? (
              <div className="loader">
                <Loader />
              </div>
            ) : (
              <button type="submit">Book Now</button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default BasicModal;
