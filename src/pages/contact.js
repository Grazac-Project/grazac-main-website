// @ts-nocheck
import Logo from "../images/logo.png";
import Twitter from "../images/svg/twitter.svg";
import Facebook from "../images/svg/facebook.svg";
// import Linkedin from "../images/svg/linkedin.svg";
import Instagram from "../images/svg/instagram.svg";
import Youtube from "../images/svg/youtube.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Helmet } from "react-helmet";
import React, { useEffect, useState } from "react";
import Cancel from "../images/svg/cancel-purple.svg";
import { validateEmail, required, numberCheck } from "../validation";
import axios from "axios";
import { Link } from "react-router-dom";

const Contact = ({  animate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  // useEffect(() => {
  //   setContactForm({
  //     name: {
  //       value: "",
  //       isValid: false,
  //       validations: [required],
  //     },
  //     phone: {
  //       value: "",
  //       isValid: false,
  //       validations: [numberCheck],
  //     },
  //     email: {
  //       value: "",
  //       isValid: false,
  //       validations: [validateEmail],
  //     },
  //     purpose: {
  //       value: "",
  //       isValid: false,
  //       validations: [required],
  //     },
  //     message: {
  //       value: "",
  //       isValid: false,
  //       validations: [required],
  //     },
  //   });
  // }, []);
  const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ number, setNumber ] = useState('');
    const [ subject, setSubject ] = useState('');
    const [ message, setMessage ] = useState('');
    
    const handleSubmit = () => {
      if(name.length && number.length&& email.length && subject.length && message.length) {
          const btn = document.querySelector('#submit');
          btn.setAttribute('disabled', '');
          btn.textContent = 'Submitting...';
          axios.post('https://grazac-academy-back-end-ej7s.onrender.com/api/v1/user/contactForm', {
              name: name,
              phone: number,
              purpose: subject,
              email: email,
              message: message
          })
          .then(resp => resp.data)
          .then(response => {
            console.log(response);
            
              if(response.status === 201) {
                  // btn.removeAttribute('disabled');
                  btn.textContent = 'Submitted';
                  setName(''); setEmail(''); setNumber(''); setSubject(''); setMessage('');
                  toast.success(response.message);
                } else {
                btn.textContent = 'Submit';

              }
          })
          .catch((err) => {
            console.log(err);
            btn.textContent = 'Submit';
              
          });
      } else {
          toast.error('Invalid input');
          // btn.textContent = 'Submit';

      }
  }

  // const [contactForm, setContactForm] = useState({
  //   name: {
  //     value: "",
  //     isValid: false,
  //     validations: [required],
  //   },
  //   phone: {
  //     value: "",
  //     isValid: false,
  //     validations: [numberCheck],
  //   },
  //   email: {
  //     value: "",
  //     isValid: false,
  //     validations: [validateEmail],
  //   },
  //   purpose: {
  //     value: "",
  //     isValid: false,
  //     validations: [required],
  //   },
  //   message: {
  //     value: "",
  //     isValid: false,
  //     validations: [required],
  //   },
  // });
  // const [formValid, setFormValid] = useState(false);

  // const handleChange = (event) => {
  //   const {
  //     target: { name, value },
  //   } = event;
  //   let isValid = true;
  //   for (let validation of contactForm[name].validations) {
  //     isValid = validation(event.target.value).isTrue && isValid;
  //   }

  //   const updatedElement = {
  //     ...contactForm[name],
  //     value: value,
  //     isValid: isValid,
  //   };

  //   const updatedForm = {
  //     ...contactForm,
  //     [name]: updatedElement,
  //   };

  //   let formIsValid = true;

  //   for (let name in contactForm) {
  //     formIsValid = updatedForm[name].isValid && formIsValid;
  //   }

  //   setContactForm(updatedForm);
  //   setFormValid(formIsValid);
  // };

  // const handleClick = () => {
  //   setSubmitting(true);
  //   const contact = new FormData();
  //   // const { email, message, name, phone, purpose } = contactForm;
  //   // contact.append("name", name.value);
  //   // contact.append("email", email.value);
  //   // contact.append("phone", phone.value);
  //   // contact.append("purpose", purpose.value);
  //   // contact.append("message", message.value);
  //   // contact.append("purpose", purpose.value);

  //   axios
  //     .post("https://grazac.com.ng/forms/contact",  {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       setSubmitting(false);
  //       setSuccess(true);
  //     })
  //     .then(() => {
  //       for (let key in contactForm) {
  //         console.log(key);
  //         setContactForm({
  //           ...contactForm,
  //           [key]: {
  //             ...contactForm[key],
  //             value: "",
  //           },
  //         });
  //       }
  //     })
  //     .catch((err) => err);
  // };

  // const { email, message, name, phone, purpose } = contactForm;

  return (
    <div
    // className={["contact animate__animated animate__slow", animate].join(" ")}
    >
      <Helmet>
        <title>Contact - Grazac</title>
        <meta name="description" content="Contact Grazac" />
        <meta name="theme-color" content="#773DD3" />
      </Helmet>
      <div className="contact">
        <div className="contact_layer">
          <ToastContainer closeButton={false} />
          <div className="container">
            <div className="contact_layer-text">
              <h1>Get In Touch</h1>
              <p>We want to hear from you. Let us know how we can help</p>
            </div>
            {/*<div classname="contact_layer-circles">
                            <img src={kamala} alt="kamala"  classname="contact_layer-circles-1" />
                            <img src={kamala} alt="kamala"  classname="contact_layer-circles-2" />
                            <img src={kamala} alt="kamala"  classname="contact_layer-circles-3" />
                            <img src={kamala} alt="kamala"  classname="contact_layer-circles-4" />
                        </div>*/}
            <div className="contact_hero">
              <div className="contact_hero-flexdiv">
                <div className="contact_hero-flexdiv-1">
                  <label>
                    Full Name 
                  </label>
                  <input
                    type="text"
                    placeholder="ex. John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="contact_hero-flexdiv-1">
                  <label>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="070xxxxxxx"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </div>
                <div className="contact_hero-flexdiv-2">
                  <label>
                    Email 
                  </label>
                  <input
                    type="text"
                    placeholder="ex. john@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label>
                  Purpose
                </label>
                <input
                  type="text"
                  placeholder="ex. John Doe"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div>
                <label>
                  Message 
                </label>
                <textarea
                  type="text"
                  placeholder="Describe your task for us"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <div className="contact_hero-privacy">
                <p>
                  By submitting this form your consent to us emailing you
                  occasionally about our products and services. You can
                  unsubscribe from emails at any time, and we will never pass
                  your email onto third parties. <span>Privacy Policy</span>
                </p>
                <button id="submit" onClick={handleSubmit}>
                {/* <button id="submit" > */}

                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="contact_campus">
            <div className="contact_campus-intro">
              <p>Connect with Us</p>
              <h2>Campus Inquiries</h2>
            </div>
            <div className="contact_campus-main">
              <div className="contact_campus-main-div boxes33">
                <h3>Office</h3>
                <p>PROHUB, Salawu Olabode Avenue, Ewang Road, </p>
                <p>Idi-aba, 110124, Abeokuta</p>
                <p>+234 806 836 5951</p>
              </div>
              <div className="contact_campus-main-div boxes33">
                <h3>Book A Call</h3>
                <p>We are here to help with any questions. </p>
                <p>Talk to our programme leads.</p>
                  <a href="tel:+2348068365951">
                <button className="btn">
                  Book a Call
                </button>
                  </a>
              </div>
              <div className="contact_campus-main-div boxes33">
                <h3>Social Media</h3>
                <div className="social">
                  <img src={Facebook} alt="social" />
                </div>
                <div className="social">
                  <img src={Twitter} alt="social" />
                </div>
                <div className="social">
                  <img src={Youtube} alt="social" />
                </div>
                <div className="social">
                  <img src={Instagram} alt="social" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <iframe
            src="https://www.google.com/maps/d/embed?mid=16NZ9a9VhKkk2-5nnYEdL93mxq7kjDZLT"
            width="100%"
            height="600"
          ></iframe>
        </div>
        {/*<extracomponent/> a component used in the landing page comes here*/}
      </div>
    </div>
  );
};

export default Contact;
