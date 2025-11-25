// @ts-nocheck
import React, { useState } from "react";
import axios from 'axios';
// import study1 from "../images/study1.png";
import buildvideo from "../images/buildvideo.png";

import Subscribe from "../components/subscribe";
import { useEffect } from "react";
import Scroll from "../components/Scroll";
import { Helmet } from "react-helmet";

const Build = () => {
  const [form, setForm] = useState(false);
  const [ text, setText ] = useState('Submit');
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [industry, setIndustry] = useState('');
  const [website, setWebsite] = useState('');
  const [promotion, setPromotion] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');

  const submitForm = e => {
    e.preventDefault();
    setText('Submitting...');
    var formElement = document.querySelector("form");
    var formData = new FormData();
    formData.append('name', name);
    formData.append('company_name', companyName);
    formData.append('title', title);
    formData.append('email', email);
    formData.append('industry', industry);
    formData.append('website', website);
    formData.append('promotion', promotion);
    formData.append('service', service);
    formData.append('message', message);
    axios.post("http://grazac.com.ng/forms/buildWithGrazac", formData)
    .then(({ data }) => {
      if (data.success === true) {
        alert('Your form has been submitted successfully, one of our marketing representative will reach out to you soon');
        setText('Submit');
        formElement.reset();
        setForm(false);
      } else {
        alert(data.msg);
        setText('Submit');
      }
    })
    .catch(err => {
      console.log(err);
    });

  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Helmet>
        <title>Build - Grazac</title>
        <meta
          name="description"
          content="Making digital solutions a seamless part of everyday life"
        />
        <meta name="theme-color" content="#773DD3" />
        <meta
          property="og:description"
          content="Making digital solutions a seamless part of everyday life"
        ></meta>
        <meta property="og:title" content="GRAZAC TECHNOLOGIES"></meta>
        <meta name="twitter:title" content="GRAZAC TECHNOLOGIES"></meta>
        <meta property="og:url" content="https://www.grazac.com.ng/build" />
      </Helmet>
      {form && (
        <div className="build_stories-bg">
          <div className="build_stories-form">
          <form onSubmit={submitForm} method="POST">
          <span id="cancel" onClick={_ => setForm(false)} style={{float: 'right', cursor: 'pointer', fontSize: '17px', color: '#000'}}>x</span>
            <div className="innovation_hero-form-flexinput">
              <input
                type="text"
                className="form-input"
                placeholder="Full Name"
                required
                onChange={e => setName(e.target.value)}
              />
              <input
                type="text"
                className="form-input"
                placeholder="Company Name"
                required
                onChange={e => setCompanyName(e.target.value)}
              />
            </div>
            <div className="innovation_hero-form-flexinput">
              <input
                type="text"
                className="form-input"
                placeholder="Title/Position in the Company"
                required
                onChange={e => setTitle(e.target.value)}
              />
              <input
                type="email"
                className="form-input"
                placeholder="Work Email"
                required
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="innovation_hero-form-flexinput">
              <input
                type="text"
                className="form-input"
                placeholder="Industry"
                required
                onChange={e => setIndustry(e.target.value)}
              />
              <input type="text" className="form-input" placeholder="Website" 
                onChange={e => setWebsite(e.target.value)}
                />
            </div>
            <div className="">
              <div>
                <label style={{ margin: "20px 0 10px" }}>
                  How did you hear about us?
                </label>
                <br />
                <label className="hear-about">
                  Via Email
                  <input type="radio" value="Email" name="promotion" 
                required
                    onChange={e => setPromotion(e.target.value)}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="hear-about">
                  Social Media
                  <input type="radio" value="Social Media" name="promotion" 
                required
                    onChange={e => setPromotion(e.target.value)}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="hear-about">
                  Grazac Personnel
                  <input type="radio" value="Grazac Personnel" name="promotion" 
                required
                    onChange={e => setPromotion(e.target.value)}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="hear-about">
                  Referral
                  <input type="radio" value="referral" name="promotion" 
                    onChange={e => setPromotion(e.target.value)}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="hear-about">
                  Online Advert
                  <input type="radio" value="Online Advert" name="promotion" 
                required
                    onChange={e => setPromotion(e.target.value)}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="hear-about">
                  Others
                  <input type="radio" value="Others" name="promotion" 
                required
                    onChange={e => setPromotion(e.target.value)}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div>
                <label style={{ margin: "20px 0 10px" }}>
                  Which of our service are you interected in?
                </label>
                <br />
                <label className="hear-about">
                  App Development
                  <input type="radio" value="App Development" name="service" 
                required
                    onChange={e => setService(e.target.value)}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="hear-about">
                  Website Development
                  <input type="radio" value="Website Development" name="service" 
                required
                    onChange={e => setService(e.target.value)}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="hear-about">
                  Startup
                  <input type="radio" value="Start-Up" name="service" 
                required
                    onChange={e => setService(e.target.value)}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="hear-about">
                  Training
                  <input type="radio" value="Training" name="service" 
                required
                    onChange={e => setService(e.target.value)}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="hear-about">
                  Other
                  <input type="radio" value="Others" name="service" 
                required
                    onChange={e => setService(e.target.value)}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div>
                <textarea
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Give further details on what you want us to do for you"
                required
                  rows={5}
                />
              </div>
            </div>
            <button type="submit" >{text}</button>
            </form>
          </div>
        </div>
      )}
      <div className="landing">
        <div className="container">
          <div className="landing_hero">
            <p>Latest project</p>
            <h1>
              <span></span>Making digital solutions a seamless part of everyday
              life
            </h1>
            <p>
              Pushing the boundaries of innovation to deliver best tech
              solutions suitable for every business type and size and capable of
              driving impact across various industries
            </p>
            <div>
              <a href="#start_form" className="build-btn">
                Start a Project
              </a>
              <button className="whitebg-btn">Check our Work</button>
            </div>
            <div>
              {/**video playing div */}
              <img
                src={buildvideo}
                alt="build"
                width="100%"
                style={{ margin: "40px 0" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="build">
        <div className="container">
          {/* <div className="build_case">
                        <h1>Case Studies</h1>
                        <div className="build_case-flex1">
                            <div className="build_case-flex1_first">
                                <img src={study1} alt="study" />
                                <h3>Inventia</h3>
                                <p>Revolutionising 3D cell biology to accelerare drug discovery</p>
                            </div>
                            <div className="build_case-flex1_second"></div>
                        </div>
                        <div className="build_case-flex2">
                            <div className="build_case-flex2_first">
                            </div>
                            <div className="build_case-flex2_second"></div>
                        </div>
                        <div className="build_case-flex3">
                            <div className="build_case-flex3_first"></div>
                            <div className="build_case-flex3_first"></div>
                        </div>
                    </div> */}
        </div>
        <div className="build_stories" id="start_form">
          <div className="build_stories-text">
            <h1>
              Let’s create digital solutions that meet your software needs
            </h1>
            <p>Click the button below to get started</p>
          </div>
          <button className="fillform-btn" onClick={() => setForm(true)}>
            Start a Project
          </button>
        </div>
      </div>
      <Subscribe />
      <Scroll />
    </div>
  );
};

export default Build;
