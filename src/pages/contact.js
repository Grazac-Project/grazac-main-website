// @ts-nocheck
import Logo from "../images/logo.png";
import Twitter from "../images/twitter.png";
import Facebook from "../images/facebook.png";
import Linkedin from "../images/linkedin.png";
import Instagram from "../images/instagram.png";
import { Helmet } from "react-helmet";
import React, { useEffect, useState } from "react";
import Cancel from "../images/svg/cancel-purple.svg";
import { validateEmail, required, numberCheck } from "../validation";
import axios from "axios";
import { Link } from "react-router-dom";

const Contact = ({ setShow, animate }) => {
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
  const [contactForm, setContactForm] = useState({
    name: {
      value: "",
      isValid: false,
      validations: [required],
    },
    phone: {
      value: "",
      isValid: false,
      validations: [numberCheck],
    },
    email: {
      value: "",
      isValid: false,
      validations: [validateEmail],
    },
    purpose: {
      value: "",
      isValid: false,
      validations: [required],
    },
    message: {
      value: "",
      isValid: false,
      validations: [required],
    },
  });
  const [formValid, setFormValid] = useState(false);

  const handleChange = (event) => {
    const {
      target: { name, value },
    } = event;
    let isValid = true;
    for (let validation of contactForm[name].validations) {
      isValid = validation(event.target.value).isTrue && isValid;
    }

    const updatedElement = {
      ...contactForm[name],
      value: value,
      isValid: isValid,
    };

    const updatedForm = {
      ...contactForm,
      [name]: updatedElement,
    };

    let formIsValid = true;

    for (let name in contactForm) {
      formIsValid = updatedForm[name].isValid && formIsValid;
    }

    setContactForm(updatedForm);
    setFormValid(formIsValid);
  };

  const handleClick = () => {
    setSubmitting(true);
    const contact = new FormData();
    const { email, message, name, phone, purpose } = contactForm;
    contact.append("name", name.value);
    contact.append("email", email.value);
    contact.append("phone", phone.value);
    contact.append("purpose", purpose.value);
    contact.append("message", message.value);
    contact.append("purpose", purpose.value);

    axios
      .post("https://grazac.com.ng/forms/contact", contact, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        setSubmitting(false);
        setSuccess(true);
      })
      .then(() => {
        for (let key in contactForm) {
          console.log(key);
          setContactForm({
            ...contactForm,
            [key]: {
              ...contactForm[key],
              value: "",
            },
          });
        }
      })
      .catch((err) => err);
  };

  const { email, message, name, phone, purpose } = contactForm;

  return (
    <div
      className={["contact animate__animated animate__slow", animate].join(" ")}
    >
      <Helmet>
        <title>Contact - Grazac</title>
        <meta name="description" content="Contact Grazac" />
        <meta name="theme-color" content="#773DD3" />
      </Helmet>
      <div className="contact__container">
        <div className="contact__header">
          <div className="contact__header-logo" onClick={() => setShow(false)}>
            <Link to="/">
              <img src={Logo} alt="grazac" />
            </Link>
          </div>
          <div
            className="contact__header-cancel"
            onClick={() => setShow(false)}
          >
            <img src={Cancel} alt="close" />
          </div>
        </div>
        <div className="contact__form">
          <div className="contact__form__container">
            {/* <h1>Drop us a line</h1> */}
            <p>Complete the form or e-mail info@grazac.com.ng</p>

            <form className="form">
              <div className="form__group">
                <label className="form__label">Name</label>
                <input
                  className="form__input"
                  onChange={handleChange}
                  type="text"
                  name="name"
                  value={name.value}
                  required
                />
              </div>
              <div className="form__group">
                <label className="form__label">Phone Number</label>
                <input
                  className="form__input"
                  type="text"
                  name="phone"
                  onChange={handleChange}
                  value={phone.value}
                  required
                />
              </div>
              <div className="form__group">
                <label className="form__label">Email Address</label>
                <input
                  className="form__input"
                  type="text"
                  name={"email"}
                  onChange={handleChange}
                  value={email.value}
                  required
                />
              </div>
              <div className="form__group">
                <label className="form__label">Purpose</label>
                <select
                  className="form__input"
                  value={purpose.value}
                  onChange={handleChange}
                  required
                  name="purpose"
                >
                  <option value="">--Please Select One--</option>
                  <option value="mentor">Mentor</option>
                  <option value="investors">Investor</option>
                  <option value="Partner">Partner</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div className="form__group">
                <label className="form__label">Message</label>
                <textarea
                  className="form__textarea"
                  value={message.value}
                  name="message"
                  required
                  onChange={handleChange}
                ></textarea>
              </div>
            </form>

            {success ? (
              <p>Message Sent Successfully</p>
            ) : (
              <button
                onClick={handleClick}
                className="contact__button"
                disabled={!formValid}
              >
                {submitting ? "Submitting" : " Send Message"}
              </button>
            )}
            <div className="contact__meta">
              <div className="contact__meta-sm">
                <p>Find Us</p>
                <div>
                  <a
                    href="https://www.instagram.com/grazacng "
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={Instagram} alt="instagram" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/gra-zac"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={Linkedin} alt="instagram" />
                  </a>
                  <a
                    href="https://www.facebook.com/grazacNG"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={Facebook} alt="instagram" />
                  </a>
                  <a
                    href="https://twitter.com/grazacng"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={Twitter} alt="instagram" />
                  </a>
                </div>
              </div>
              <p>info@grazac.com.ng</p>
              <div className="contact__meta-adr">
                <p>Abeokuta, Nigeria</p>
                <p>+234 806 836 5951</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
