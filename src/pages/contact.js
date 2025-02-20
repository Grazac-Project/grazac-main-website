// @ts-nocheck
import Logo from "../images/logo.png";
import Twitter from "../images/svg/twitter.svg";
import Facebook from "../images/svg/facebook.svg";
// import Linkedin from "../images/svg/linkedin.svg";
import Instagram from "../images/svg/instagram.svg";
import Youtube from "../images/svg/youtube.svg";

import { Helmet } from "react-helmet";
import React, { useEffect, useState } from "react";
import Cancel from "../images/svg/cancel-purple.svg";
import { validateEmail, required, numberCheck } from "../validation";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = ({ animate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState({
    name: "",
    number: "",
    subject: "",
    message: "",
    email: "",
  });

  const validateForm = ({ name, number, email, subject, message }) => {
    let isValid = true;
    let errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }
    if (!number.trim() || number.length !== 11 || !/^\d+$/.test(number)) {
      errors.number = "Phone number must be 11 digits";
      isValid = false;
    }
    if (!validateEmail() || !required(email) || !email.trim()) {
      errors.email = "Email is invalid or missing";
      console.log(errors.email);
      isValid = false;
    }
    if (!subject.trim()) {
      errors.subject = "Purpose is required";
      isValid = false;
    }
    if (!message.trim()) {
      errors.message = "Message is required";
      isValid = false;
    } else {
      setError(false);
    }

    setError(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm({ name, number, email, subject, message })) {
      console.log(email);
      const btn = document.querySelector("#submit");
      btn.setAttribute("disabled", "");
      btn.textContent = "Submitting...";
      axios
        .post(
          "https://grazac-academy-back-end-ej7s.onrender.com/api/v1/user/contactForm",
          {
            name,
            phone: number,
            purpose: subject,
            email,
            message,
          }
        )
        .then((resp) => resp.data)
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            // alert(response.msg);
            btn.textContent = "Submitted!";
            setName("");
            setEmail("");
            setNumber("");
            setSubject("");
            setMessage("");
            toast.success(response.message);
          } else {
            btn.textContent = "Submit";
            toast.error(response.message);
          }
        })
        .catch((err) => {
          console.log(err);
          btn.textContent = "Submit";
          toast.error(error);
        });
    }
  };

  return (
    <div>
      <Helmet>
        <title>Contact - Grazac</title>
        <meta name="description" content="Contact Grazac" />
        <meta name="theme-color" content="#773DD3" />
      </Helmet>
      <div className="contact">
        <ToastContainer closeButton={false} />

        <div className="contact_layer">
          <div className="container">
            <div className="contact_layer-text">
              <h1>Get In Touch</h1>
              <p>We want to hear from you. Let us know how we can help</p>
            </div>
            <form className="contact_hero" onSubmit={handleSubmit}>
              <div className="contact_hero-flexdiv">
                <div className="contact_hero-flexdiv-1">
                  {error.name ? (
                    <span>{error.name}</span>
                  ) : (
                    <label>Full Name</label>
                  )}

                  <input
                    type="text"
                    placeholder="ex. John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="contact_hero-flexdiv-1">
                  {error.number ? (
                    <span>{error.number}</span>
                  ) : (
                    <label>Phone Number</label>
                  )}

                  <input
                    type="tel"
                    placeholder="070xxxxxxx"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </div>
                <div className="contact_hero-flexdiv-2">
                  {error.email ? (
                    <span>{error.email}</span>
                  ) : (
                    <label>Email</label>
                  )}

                  <input
                    type="text"
                    placeholder="ex. john@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                {error.subject ? (
                  <span>{error.subject}</span>
                ) : (
                  <label>Purpose</label>
                )}

                <input
                  type="text"
                  placeholder="ex. John Doe"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div>
                {error.message ? (
                  <span>{error.message}</span>
                ) : (
                  <label>Message</label>
                )}

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
                <button id="submit" type="submit">
                  Submit
                </button>
              </div>
            </form>
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
                  <button className="btn">Book a Call</button>
                </a>
              </div>
              <div className="contact_campus-main-div boxes33">
                <h3>Social Media</h3>
                <a
                  href="https://www.facebook.com/grazacng"
                  target="_blank"
                  rel="noreferrer"
                  className="social"
                >
                  <img src={Facebook} alt="social" />
                </a>
                <a
                  href="https://twitter.com/grazacacademy"
                  target="_blank"
                  rel="noreferrer"
                  className="social"
                >
                  <img src={Twitter} alt="social" />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCAQ_Q8wYZloETgrdlBbwMtg"
                  target="_blank"
                  rel="noreferrer"
                  className="social"
                >
                  <img src={Youtube} alt="social" />
                </a>
                <a
                  href="https://www.instagram.com/grazacacademy/"
                  target="_blank"
                  rel="noreferrer"
                  className="social"
                >
                  <img src={Instagram} alt="social" />
                </a>
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
      </div>
    </div>
  );
};

export default Contact;
