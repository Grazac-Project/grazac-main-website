import classes from "./newsForm.module.css";
import NewsletterModal from "../newsletterModal";
// import Message from "../../../images/newsletter/message-1.svg";
import Message from "../../../images/newsletter/popup-envelope.png";
import Check from "../../../images/newsletter/check.svg";
import LoaderGif from "../../../images/svg/dashboard/loader.gif";
import { useState, useEffect } from "react";
import axios from "axios";
import { zohoSubmit } from "../../../api/dashboard/data";
import NewsResponse from '../newsResponse/newsResponse'

const Newsform = ({ setNews, setNewsMessage }) => {
  const [loading, setLoading] = useState(false);
  const [thanks, setThanks] = useState(true)
  const [payload, setPayload] = useState({
    fullName: "",
    email: "",
  });
  
  function splitEmail(email) {
    const atIndex = email.indexOf('@');
    if (atIndex !== -1) {
      const username = email.substring(0, atIndex);
      const domain = email.substring(atIndex + 1);
      return { username, domain };
    } else {
      // Handle the case where there is no "@" symbol in the email.
      return null;
    }
  }

  function splitFullName(fullName) {
    // Split the full name by space
    const nameParts = fullName.split(' ');
  
    if (nameParts.length >= 2) {
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' '); // Join any remaining parts as the last name
  
      return { firstName, lastName };
    } else {
      // Handle cases where there is no space to separate the first and last name.
      // You might want to return an error or handle it differently.
      return null;
    }
  }
  

  const handleChange = (e) => {
    setPayload((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const key = process.env.REACT_APP_API_KEY;
  console.log(key);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(payload);

      setLoading(true);
      zohoSubmit(payload)
        .then(res => {
          console.log(res.data.data)
          console.log(res.data.data.data)
          if (res.data.data.data.status === 'success') {
            console.log('hahahahahaha')
            setNews("newsResponse");
            setThanks(false);
          }
        })
        .catch(error => {
          setLoading(false);
          console.log(error.response);
        })
        
    }

  return (
    <>
      <NewsletterModal setNews={setNews}>
        {thanks ?
        <form className={classes.main} onSubmit={handleSubmit}>
          <div className={classes.formImage}>
            <img src={Message} alt="message" />
          </div>
          <div className={classes.formInput}>
            <div>
              <h2>Become an Insider to</h2>
              {benefits.map((item, i) => (
                <p key={i}>
                  <img src={Check} alt="icon" />
                  {item}
                </p>
              ))}
            </div>
            <label>
              <input
                type="text"
                required
                name="fullName"
                value={payload.fullName}
                placeholder="Full name e.g John Doe"
                onChange={handleChange}
              />
              {/* <input
                type="text"
                required
                name='FIRSTNAME'
                placeholder="Your name"
              /> */}
            </label>
            <label>
              <input
                type="email"
                required
                name="email"
                value={payload.email}
                placeholder="Your email"
                onChange={handleChange}
              />
              {/* <input
                type="email"
                required
                name="CONTACT_EMAIL"
                placeholder="Your email"
              /> */}
            </label>
            <button
              disabled={
                payload.fullName.length < 2 ||
                payload.email.length < 3 ||
                loading
              }
            >
            {/* <button
              type="submit"
            > */}
              {loading ? <img src={LoaderGif} alt="Loading" /> : "Submit"}
            </button>
          </div>
        </form> : <newsResponse />}
      </NewsletterModal>
    </>
  );
};

export default Newsform;

const benefits = [
  "Be a part of our journey",
  "Get early access to insights & opportunities in tech",
  "Get all the support you need to thrive as a person & as a Techie",
];
