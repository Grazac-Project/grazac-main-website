// @ts-nocheck
import Button from "../components/button";
import { Helmet } from "react-helmet";
import { values, areas } from "../constants";
import Subscribe from "../components/subscribe";
import btnwhite from "../images/svg/button-arrow.svg";
import { Slide } from "react-reveal";
import React, { useEffect } from "react";
import ShowContext from "../showContext";
import { Link } from "react-router-dom";



const StartUp = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { reveal } = React.useContext(ShowContext);
  return (
    <div className="startup">
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
      {/*<Slide left duration={4000}>*/}
      <section className="startup__intro">
        <div className="startup__intro-container">
          <h1 className="title">
            Contributing immensely to the rise of new innovations globally
          </h1>
          <p className="muted muted-1">
            We strive to provide best tech support for innovative start-ups that
            are capable of making giant impacts and solving big problems across
            the economy of Africa.
          </p>
          <div className="startup__intro-btns">
            <Link to="/apply" className="button button-bg">
              <span>Apply Now</span>
              <img src={btnwhite} alt="arrow" />
            </Link>
            {/* <Button extra="button-nobg">
              <span>Discover</span>
              <img src={btnpurple} alt="arrow" />
            </Button> */}
          </div>
        </div>
      </section>
      {/*</Slide>
      <Slide right duration={4000}>*/}
      <section className="startup__areas">
        <div className="startup__areas-container">
          <div className="startup__areas-box">
            <div className="startup__areas-header">
              <h1 className="subheader subheader-purple">Area of Focus</h1>
              <p className="muted muted-2">
                We focus on these 6 key impact sectors in the economy. We
                receive applications every 6 months for start-ups who are
                interested in our innovation lab.
              </p>
            </div>
            {areas.map((focus) => (
              <div
                key={focus.id}
                className={[
                  "startup__areas-item",
                  `startup__areas-item-${focus.id}`,
                ].join(" ")}
              >
                <div className="startup__areas-item-container">
                  <div
                    className="startup__areas-item-icon"
                    style={{ backgroundColor: focus.bgcolor }}
                  >
                    <img src={focus.icon} alt={focus.title} />
                  </div>
                  <h1 className="name name-1">{focus.title}</h1>
                  <p className="muted muted-2">{focus.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/*</Slide>*/}
      <section className="startup__values">
        <div className="startup__values-container">
          <div className="startup__values-header">
            <h5 className="small small-white">featured & partners </h5>
            <h3 className="subheader subheader-white  ">Value to Startups </h3>
          </div>
          <div className="startup__values-items">
            {values.map((item) => (
              <div key={item.id} className="value">
                <div className="value__container">
                  <h2>{item.id}</h2>
                  <div className="value__content">
                    <h1 className="name name-2">{item.title}</h1>
                    <p className="muted muted-3">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="startup__timeline">
        <div className="startup__timeline-container">
          <div className="startup__timeline-header">
            <h5 className="small small-grey">featured & partners </h5>
            <h3 className="subheader subheader-purple">Our Timeline</h3>
          </div>
          <div className="startup__timeline-list">
            <Slide right duration={4000}>
              <div className="startup__timeline-item">
                <p>NOV 1ST, 2020</p>
                <div className="startup__timeline-meta">
                  <span></span>
                  <p>Application Deadline</p>
                </div>
              </div>
            </Slide>
            <Slide right duration={5000}>
              <div className="startup__timeline-item">
                <p>NOV 1ST, 2020</p>
                <div className="startup__timeline-meta">
                  <span></span>
                  <p>Start of Accelerator</p>
                </div>
              </div>
            </Slide>
            <Slide right duration={6000}>
              <div className="startup__timeline-item">
                <p>NOV 1ST, 2020</p>
                <div className="startup__timeline-meta">
                  <span></span>
                  <p>Alumni Programme</p>
                </div>
              </div>
            </Slide>
            <Slide right duration={7000}>
              <div className="startup__timeline-item">
                <div className="startup__timeline-meta">
                  <span></span>
                  <p>Startups Selected </p>
                </div>
                <p>NOV 1ST, 2020</p>
              </div>
            </Slide>
            <Slide right duration={8000}>
              <div className="startup__timeline-item">
                <div className="startup__timeline-meta">
                  <span></span>
                  <p>Demo Day</p>
                </div>
                <p>NOV 1ST, 2020</p>
              </div>
            </Slide>
            <div className="mobile">
              <div className="mobile__container">
                <span></span>
                <Slide right delay={1000}>
                  <div className="mobile__meta">
                    <p>NOV 1ST, 2020</p>
                    <p>Application Deadline</p>
                  </div>
                </Slide>
              </div>
            </div>
            <div className="mobile">
              <div className="mobile__container">
                <span></span>
                <Slide right delay={1500}>
                  <div className="mobile__meta">
                    <p>NOV 1ST, 2020</p>
                    <p>Application Deadline</p>
                  </div>
                </Slide>
              </div>
            </div>
            <div className="mobile">
              <div className="mobile__container">
                <span></span>
                <Slide right delay={2000}>
                  <div className="mobile__meta">
                    <p>NOV 1ST, 2020</p>
                    <p>Application Deadline</p>
                  </div>
                </Slide>
              </div>
            </div>
            <div className="mobile">
              <div className="mobile__container">
                <span></span>
                <Slide right delay={2500}>
                  <div className="mobile__meta">
                    <p>NOV 1ST, 2020</p>
                    <p>Application Deadline</p>
                  </div>
                </Slide>
              </div>
            </div>
            <div className="mobile">
              <div className="mobile__container">
                <span></span>
                <Slide right delay={3000}>
                  <div className="mobile__meta">
                    <p>NOV 1ST, 2020</p>
                    <p>Application Deadline</p>
                  </div>
                </Slide>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*<Slide left duration={4000}>*/}
      <section className="startup__involve">
        <div className="startup__involve-container">
          <div>
            <h3 className="subheader subheader-white">Get Involved</h3>
          </div>
          <div className="startup__involve-items">
            <div className="startup__involve-list">
              <div className="startup__involve-list-container">
                <h1>Grow your stratup with with Grazac Innovation Lab</h1>
                <Button extra="button-bg" click={reveal}>
                  <span>Apply Now</span>
                  <img src={btnwhite} alt="arrow" />
                </Button>
              </div>
            </div>

            <div className="startup__involve-list">
              <div className="startup__involve-list-container">
                <h1>Support innovative enterprises with expert advice</h1>
                <Button extra="button-bg" click={reveal}>
                  <span>Register as a mentor</span>
                  <img src={btnwhite} alt="arrow" />
                </Button>
              </div>
            </div>
            <div className="startup__involve-list">
              <div className="startup__involve-list-container">
                <h1>
                  Form strategic partnership with start-ups and make solid
                  returns as an investor.{" "}
                </h1>
                <Button extra="button-bg" click={reveal}>
                  <span>Become an investor</span>
                  <img src={btnwhite} alt="arrow" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*</Slide>*/}
      <section className="startup__subscribe">
        <Subscribe />
      </section>
    </div>
  );
};

export default StartUp;
