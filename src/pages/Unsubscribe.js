// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Button from "../components/button";
import Logo from "../images/logo-full.png";

const Unsubscribe = () => {

  const [ text, setText ] = useState('Unsubscribe');
  const [ email, setEmail ] = useState('');
  const [ reason, setReason ] = useState('');
  const [ message, setMessage ] = useState('');
  const [ disable, setDisable ] = useState(false);

  const action = () => {
    if(!disable) {
      setText('Unsubscribing...');
      fetch(`http://grazac.com.ng/newsletter/unsubscribe?xP=${email}&reason=${reason}&msg=${message}`)
      .then(resp => resp.json())
      .then(resp => {
        if(resp.success === true) {
          setText('Unsubscribed');
          alert('You have successfully unsubscribe from our newsletter.');
          setDisable(true);
        }
      })
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if( params.has('xP') ) {
      setEmail( params.get('xP') );
    } else {
      setDisable(true);
    }
  }, [])

  return (
    <div className="unsubscribe">
      <div className="unsubscribe__container">
        <div>
          <Link to="/" className="unsubscribe__link">
            <img src={Logo} alt="grazac" />
          </Link>
          <div>
            <div className="unsubscribe__box">
              <h2 className="subheader subheader-purple">
                Unsubscribe me from all mailings.
              </h2>
              <p className="muted mtued-2">
                If you have a moment, please let us know why you unsubscribed
              </p>
              <div className="unsubscribe__radios">
                <div className="unsubscribe__radio">
                  <input
                    type="radio"
                    className="unsubscribe__input"
                    id="no"
                    onChange={e => setReason(e.target.value)}
                    name="reason"
                    value="I no longer wish to receive your emails"
                    hidden
                  ></input>
                  <label htmlFor="no" className="unsubscribe__label">
                    <span></span>
                    <span className="muted muted-2">
                      I no longer wish to receive your emails
                    </span>
                  </label>
                </div>
              </div>
              <div className="unsubscribe__textarea">
                <textarea placeholder="Send us a message (optional)" onChange={e => setMessage(e.target.value)}></textarea>
              </div>
              <div className="mt unsubscribe__btn">
                <Button click={action} extra={"button-bg"}>{text}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unsubscribe;
