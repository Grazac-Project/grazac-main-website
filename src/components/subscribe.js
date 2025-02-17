// @ts-nocheck
import React, { useState } from "react";
import axios from "axios";
import subscribe from "../images/svg/subscription-arrow.svg";
import Loader from "./Loader";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    if (
      email !== "" &&
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      setLoading(true);
      setMsg("");
      const data = new FormData();
      data.append("email", email);
      axios
        .post("https://grazac.com.ng/newsletter/subscribe", data)
        .then(({ data }) => {
          console.log(data);
          if (!data.success) {
            setLoading(false);
            setMsg(data.msg);
          } else {
            setLoading(false);
            alert("You have successfully subscribed to our newsletter.");
            setEmail("");
          }
        })
        .catch((err) => {
          setLoading(false);
          setMsg("Error subscribing to our newsletter, pls try again");
        });
    } else if (email === "") {
      setMsg("Empty input");
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      setMsg("Invalid Email Address");
    }
  };

  return (
    <div className="subscribe">
      <div className="subscribe__container">
        {loading ? (
          <Loader />
        ) : (
          <>
            <p>Get weekly updates and ideas on tech in your inbox.</p>
            <div style={{ alignSelf: "stretch", position: "relative" }}>
              <form style={{ position: "relative", backgroundColor: "#F8F8F8" }} onSubmit={handleSubmit}>
                <input
                  type="email"
                  className="subscribe_email"
                  placeholder="Please enter a valid Email Address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                {msg !== "" && (
                  <p
                    style={{
                      marginTop: "1rem",
                      color: "red",
                      fontSize: "1rem",
                    }}
                  >
                    {msg}
                  </p>
                )}
                <div onClick={handleSubmit}>
                  <img src={subscribe} alt="" className="subscribe__img" />
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Subscribe;
