// @ts-nocheck
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FiArrowRight, FiCalendar } from "react-icons/fi";
import { values, areas } from "../constants";
import "../styles/pages.css";

import pitchImg from "../images/redesign/pitch.jpg";
import focusImg from "../images/redesign/focus2.jpg";
import labImg from "../images/redesign/lab.jpg";
import mentorsImg from "../images/redesign/mentors.jpg";
import teamImg from "../images/redesign/crew.jpg";

const timeline = [
  { title: "Application deadline", text: "Submit your startup's application to the lab." },
  { title: "Startups selected", text: "Shortlisted founders are announced." },
  { title: "Start of accelerator", text: "Hands-on support, mentorship and resources." },
  { title: "Demo Day", text: "Pitch your progress to investors and partners." },
  { title: "Alumni programme", text: "Stay connected to the Grazac community." },
];

const involve = [
  {
    title: "Grow your startup",
    text: "Join the Grazac Innovation Lab and scale your idea.",
    cta: "Apply now",
    to: "/apply",
    image: labImg,
  },
  {
    title: "Become a mentor",
    text: "Share your experience with the founders in our community.",
    cta: "Get in touch",
    to: "/contact",
    image: mentorsImg,
  },
  {
    title: "Become a partner",
    text: "Back the next generation of African innovation.",
    cta: "Partner with us",
    to: "/contact",
    image: teamImg,
  },
];

const StartUp = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="gz">
      <Helmet>
        <title>Startup - Grazac</title>
        <meta
          name="description"
          content="Contributing immensely to the rise of new innovations globally"
        />
        <meta name="theme-color" content="#773DD3" />
        <meta
          property="og:description"
          content="Contributing immensely to the rise of new innovations globally"
        ></meta>
        <meta property="og:title" content="GRAZAC TECHNOLOGIES"></meta>
        <meta name="twitter:title" content="GRAZAC TECHNOLOGIES"></meta>
        <meta property="og:url" content="https://www.grazac.com.ng/startup" />
      </Helmet>

      {/* Hero */}
      <section className="gz-hero">
        <div className="gz-container gz-hero__grid">
          <div className="gz-hero__copy">
            {/* <span className="gz-eyebrow">Grazac Innovation Lab</span> */}
            <h1 className="gz-display">
              Powering the rise of <span className="gz-accent">new innovations.</span>
            </h1>
            <p className="gz-lead">
              We strive to provide the best tech support for innovative start-ups capable of making
              giant impacts and solving big problems across the economy of Africa.
            </p>
            <div className="gz-actions">
              <Link to="/apply" className="gz-btn gz-btn--primary">
                Apply now <FiArrowRight />
              </Link>
              <a href="#value" className="gz-btn gz-btn--ghost">
                What you get
              </a>
            </div>
          </div>

          <div className="gz-hero__media" data-aos="fade-left" data-aos-once="true">
            <div className="gz-hero__photo">
              <img src={pitchImg} alt="A founder presenting at the Grazac Innovation Lab" />
            </div>
            <div className="gz-hero__inset">
              <img src={focusImg} alt="A founder building at Grazac" />
            </div>
            {/* <div className="gz-chip gz-hero__chip">
              <span className="gz-chip__icon">
                <FiCalendar />
              </span>
              <span>
                <strong>Applications twice a year</strong>
                A new cohort every 6 months
              </span>
            </div> */}
          </div>
        </div>
      </section>

      {/* Areas of focus */}
      <section className="gz-section gz-section--tint">
        <div className="gz-container">
          <div className="gz-section-head">
            {/* <span className="gz-eyebrow">Areas of focus</span> */}
            <h2 className="gz-h2">7 sectors where we see the biggest impact</h2>
            <p className="gz-lead">
              We receive applications every 6 months from start-ups building in these key impact
              sectors of the economy.
            </p>
          </div>
          <div className="gz-focus">
            {areas.map((focus, index) => (
              <article
                className="gz-focus__item"
                key={focus.id}
                data-aos="fade-up"
                data-aos-delay={(index % 4) * 80}
                data-aos-once="true"
              >
                <span className="gz-focus__icon" style={{ backgroundColor: focus.bgcolor }}>
                  <img src={focus.icon} alt="" />
                </span>
                <h3 className="gz-h3">{focus.title}</h3>
                <p className="gz-body">{focus.text}</p>
              </article>
            ))}
            <article
              className="gz-focus__item gz-focus__cta"
              data-aos="fade-up"
              data-aos-delay="240"
              data-aos-once="true"
            >
              <h3 className="gz-h3">Building in one of these?</h3>
              <p>Tell us about your startup and join our next cohort.</p>
              <Link to="/apply" className="gz-btn gz-btn--light">
                Apply now <FiArrowRight />
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Value to startups */}
      <section className="gz-section gz-dark" id="value">
        <div className="gz-container">
          <div className="gz-section-head">
            {/* <span className="gz-eyebrow gz-eyebrow--dark">What you get</span> */}
            <h2 className="gz-h2">Value to startups</h2>
            <p className="gz-lead">
              Everything a founder needs to go from idea to a sustainable business, in one place.
            </p>
          </div>
          <div className="gz-values">
            {values.map((item) => (
              <article className="gz-values__item" key={item.id}>
                <span className="gz-values__num">{item.id}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="gz-section gz-section--tint">
        <div className="gz-container">
          <div className="gz-section-head gz-section-head--center">
            {/* <span className="gz-eyebrow">How it works</span> */}
            <h2 className="gz-h2">Our timeline</h2>
          </div>
          <ol className="gz-timeline">
            {timeline.map((step, index) => (
              <li
                className="gz-step"
                key={step.title}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-once="true"
              >
                <span className="gz-step__dot">{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Get involved */}
      <section className="gz-section">
        <div className="gz-container">
          <div className="gz-section-head">
            {/* <span className="gz-eyebrow">Get involved</span> */}
            <h2 className="gz-h2">There's a place for you at Grazac</h2>
          </div>
          <div className="gz-cards-3">
            {involve.map((item, index) => (
              <Link
                to={item.to}
                className="gz-involve"
                key={item.title}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-once="true"
              >
                <img src={item.image} alt="" loading="lazy" />
                <div className="gz-involve__body">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <span className="gz-btn gz-btn--light">
                    {item.cta} <FiArrowRight />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default StartUp;
