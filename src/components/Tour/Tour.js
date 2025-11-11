// // @ts-nocheck
// import React, { useState } from "react";
// import axios from "axios";
// import Classes from "./Tour.module.css";
// import "react-calendar/dist/Calendar.css";
// // import Calendar from "react-calendar";
// // import Dropdown from "../../images/svg/Arrow.svg";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Tour = ({ tour, setTour }) => {
//   const options = { day: "numeric", month: "short", year: "numeric" };
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [message, setMessage] = useState("");
//   const [time, setTime] = useState("Select Time");
//   const [date, setDate] = useState("Select Date");
//   const [value, onChange] = useState(new Date());
//   const [dropdown, setDropdown] = useState(false);
//   const [dropdown2, setDropdown2] = useState(false);
//   const [text, setText] = useState("Book Now");
//   const [disabled, setDisabled] = useState("");

//   const bookTour = (e) => {
//     e.preventDefault();
//     setText("Submitting...");
//     setDisabled(true);
//     var formData = new FormData();
//     formData.append("firstName", firstName);
//     formData.append("lastName", lastName);
//     formData.append("email", email);
//     formData.append("phoneNumber", phone);
//     formData.append("date", date);
//     formData.append("time", time);
//     formData.append("message", message);
//     console.log(formData);
//     axios
//       .post(
//         "https://api-grazacacademy-0358136c0905.herokuapp.com/api/v1/user/bookATour",
//         formData
//       )
//       .then((resp) => resp.data)
//       .then((resp) => {
//         // console.log(resp.status)
//         if (resp.status === 201) {
//           toast.success("Payment successful! Verifying payment...");
//           // alert("Payment successful! Verifying payment...");

//           // document.querySelector("#bookTour").reset();
//           // setTour(false);
//           setTimeout(() => {
//             setTour(false);
//           }, 4500);
//           setDisabled(false);
//           setText("Submit");
//         } else {
//           setText("Submit");
//           setDisabled(false);
//           toast("something is wrong");
//         }
//       })
//       .catch((err) => {
//         toast.error("Form submission not successful...");
//         setText("Submit");
//       });
//   };

//   const handleChange = (value, event) => {
//     const formattedDate = value.toLocaleDateString("en-US", options);
//     setDate(formattedDate);
//     setDropdown(false);
//     setDropdown2(false);
//     console.log(time);
//   };
//   const handleChange2 = () => {
//     setDropdown2(true);
//   };

//   return (
//     <div>
//       {tour ? (
//         <>
//           <ToastContainer closeButton={false} />
//           <div className={Classes.main}>
//             <div className={Classes.container}>
//               <div className={Classes.innerContainer}>
//                 <div className={Classes.close} onClick={() => setTour(false)}>
//                   <span>&times;</span>
//                 </div>
//                 {/* <div className={Classes.text}>
//                   <h3>Book a Tour</h3>
//                   <p>
//                     We are ready to take you on a tour of our workspace. Please
//                     fill in this information correctly to get a taste for free!{" "}
//                     <br />{" "}
//                     <span>The tour is available between 9 am and 5 pm.</span>
//                   </p>
//                 </div> */}
//                 <form className={Classes.form} onSubmit={bookTour}>
//                   <iframe
//                     src="https://docs.google.com/forms/d/e/1FAIpQLSePpqQW6duQy2F2Gak1mkfnvUJ04DQvmLQ0gZC-EXfG_XjDDg/viewform?embedded=true"
//                     // width="0"
//                     height="1337"
//                     frameborder="0"
//                     marginheight="0"
//                     marginwidth="0"
//                     style={{width: "100%"}}
//                   >
//                     Loading…
//                   </iframe>
//                   {/* <input
//                     type="text"
//                     placeholder="First Name"
//                     minLength={3}
//                     name="firstName"
//                     onChange={(e) => setFirstName(e.target.value)}
//                     required
//                   />
//                   <input
//                     type="text"
//                     placeholder="Last Name"
//                     minLength={3}
//                     name="lastName"
//                     onChange={(e) => setLastName(e.target.value)}
//                     required
//                   />

//                   <input
//                     type="email"
//                     placeholder="Email Address"
//                     minLength={10}
//                     name="email"
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                   <input
//                     type="text"
//                     placeholder="Phone Number"
//                     minLength={11}
//                     maxLength={15}
//                     onChange={(e) => setPhone(e.target.value)}
//                     name="phoneNumber"
//                     required
//                   />
//                   <div className={Classes.calender} onClick={() => setDropdown(true)}>
//                     <div>{date}</div>
//                     <img
//                       src={Dropdown}
//                       alt="icon"
                      
//                     />
//                   </div>
//                   {dropdown ? (
//                     <div
//                       style={{
//                         zIndex: "99999",
//                         position: "absolute",
//                         top: "65%",
//                         left: "50%",
//                       }}
//                     >
//                       <Calendar onChange={handleChange} value={value} />
//                     </div>
//                   ) : null}

//                   <div className={Classes.calender} onClick={handleChange2}>
//                     <div>{time}</div>
//                     <img src={Dropdown} alt="icon"  />
//                   </div>
//                   {dropdown2 ? (
//                     <div
//                       style={{
//                         zIndex: "9999",
//                         position: "absolute",
//                         top: "65%",
//                         left: "50%",
//                         width: "242px",
//                         borderRadius: "8px",
//                         boxShadow: "1px 1px 4px 0px rgba(0, 0, 0, 0.10)",
//                         padding: "10px 16px",
//                         backgroundColor: "#fff",
//                       }}
//                     >
//                       <div
//                         className={Classes.time}
//                         onClick={() => setDropdown2(false)}
//                       >
//                         <div onClick={() => setTime("9:00am")}>9:00 am</div>
//                         <div onClick={() => setTime("10:00am")}>10:00 am</div>
//                         <div onClick={() => setTime("6:00pm")}>6:00 pm</div>
//                       </div>
//                     </div>
//                   ) : null}
//                   <textarea
//                     type="text"
//                     placeholder="Message"
//                     name="message"
//                     onChange={(e) => setMessage(e.target.value)}
//                     required
//                   >
//                   </textarea>

//                   <button
//                     className={Classes.btn}
//                     disabled={disabled}
//                     type="submit"
//                   >
//                     {text}
//                   </button> */}
//                 </form>
//               </div>
//             </div>
//           </div>
//         </>
//       ) : null}
//     </div>
//   );
// };

// export default Tour;

import React from "react";
import Classes from "./Tour.module.css";
import "react-calendar/dist/Calendar.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Tour = ({ tour, setTour }) => {
  return (
    <div>
      {tour ? (
        <>
          <ToastContainer closeButton={false} />
          <div className={Classes.main}>
            <div className={Classes.container}>
              <div className={Classes.innerContainer}>
                <div className={Classes.close} onClick={() => setTour(false)}>
                  <span>&times;</span>
                </div>
                <div className={Classes.form}>
                  <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLSePpqQW6duQy2F2Gak1mkfnvUJ04DQvmLQ0gZC-EXfG_XjDDg/viewform?embedded=true"
                    height="1337"
                    frameBorder="0"
                    marginHeight="0"
                    marginWidth="0"
                    style={{width: "100%"}}
                    title="Book a Tour Form"
                  >
                    Loading…
                  </iframe>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Tour;