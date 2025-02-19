// @ts-nocheck
// components
import React, { useEffect, useState } from "react";
import ShowContext from "../showContext";
// import Footer from "../components/Footer";
import Subscribe from "../components/subscribe";
import { Link } from "react-router-dom";

//images
import working from "../images/svg/working.svg";
import build from "../images/svg/gtc.svg";
import academy from "../images/svg/academy.svg";
import innovation from "../images/svg/innovation.svg";
// import business from "../images/svg/business.svg";
import arrow from "../images/svg/button-arrow.svg";
// import news1 from "../images/news1.png";
// import news2 from "../images/news2.png";
// import news3 from "../images/news3.png";
import scroll1 from "../images/svg/scroll1.svg";
import pattern1 from "../images/svg/home-right-pattern.svg";
import pattern2 from "../images/svg/home-left-pattern.svg";
import btnwhite from "../images/svg/button-arrow.svg";

import google from "../images/google.png";
import haptic from "../images/haptic.png";
import businessday from "../images/businessday.png";
import pettysave from "../images/pettysave.png";
import tg from "../images/tg.png";
import google2 from "../images/google2.png";
import haptic2 from "../images/haptic2.png";
import businessday2 from "../images/businessday2.png";
import pettysave2 from "../images/pettysave2.png";
import tg2 from "../images/tg2.png";
import { Helmet } from "react-helmet";
import Button from "../components/button";
import axios from "axios";
import Loader from "../components/Loader";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const Landing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [blogs, setBlogs] = useState([]);

  const options = {
    width: "100%",
    type: "loop",
    gap: "20px",
    autoplay: true,
    pauseOnHover: true,
    resetProgress: false,
    arrows: false,
    dots: false,
    perPage: 5,
    breakpoints: {
      450: {
        gap: "5px",
        arrows: true,
        perPage: 2.5,
      },
      640: {
        gap: "24px",
        arrows: true,
        perPage: 2.5,
      },
      768: {
        gap: "24px",
        arrows: true,
        perPage: 3,
      },
      1024: {
        gap: "8px",
        arrows: true,
        perPage: 4,
      },
    },
  };
  useEffect(() => {
    //   axios
    //     .get(
    //       "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@grazac"
    //     )
    //     .then((res) => {
    //       const result = res.data.items.splice(0, 3);
    //       console.log(res);
    //       setBlogs(result);
    //     });
    // }, []);
    axios
      .get(
        "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@grazac"
      )
      .then((res) => {
        setBlogs(res.data.items.splice(0, 3));
      });
  }, []);

  // const { reveal } = React.useContext(ShowContext);
  const navigateToContact = () => {
    window.location.href = "/contact";
  };

  return (
    <div>
      <Helmet>
        <title>Home - Grazac</title>
        <meta name="description" content="IDEAS, PEOPLE AND A SMART FUTURE" />
        <meta name="theme-color" content="#773DD3" />
        <meta
          property="og:description"
          content="IDEAS, PEOPLE AND A SMART FUTURE"
        ></meta>
        <meta property="og:title" content="GRAZAC TECHNOLOGIES"></meta>
        <meta name="twitter:title" content="GRAZAC TECHNOLOGIES"></meta>
        <meta property="og:url" content="https://www.grazac.com.ng/" />
      </Helmet>
      <div className="landing">
        <div className="landing_pattern">
          <div className="container">
            <div className="landing_hero">
              <h6>WELCOME TO GRAZAC</h6>
              <h1>
                <span>IDEAS, PEOPLE AND A SMART FUTURE</span>
              </h1>
              <p>
                We are building an ecosystem that facilitates technology
                entrepreneurship while enhancing economic development
              </p>
              <div className="landing_hero_btn">
                <Button extra="button button-bg" click={navigateToContact}>Partner With Us</Button>
              </div>
              <img src={pattern1} alt="" className="pattern_1" />
              <img src={pattern2} alt="" className="pattern_2" />
            </div>
          </div>
        </div>
        <div className="landing_wwd">
          <div className="landing_wwd-columns">
            <div className="landing_wwd-textpart section1">
              <p>WHAT WE DO</p>
              <h1>We develop, support and scale tech innovations</h1>
              <p>
                We provide best solutions and an enabling environment that
                brings to life your intelligent ideas while leveraging on tech
                tools
              </p>
              <img
                src={scroll1}
                alt="scroll"
                width="40px"
                className="hvr-hang"
                style={{ marginBottom: "40px" }}
              />
            </div>
            <div className="section1">
              <div className="landing_wwd-four">
                <div className="svg-circle1">
                  <img src={innovation} alt="illustration" />
                </div>
                <div>
                  <h3>Grazac Innovation Lab</h3>
                  <p>
                    A lab where your imagination meets execution. With the right
                    tools and talents, we propel your idea and drive your vision
                    forward to become a viable start-up venture in the global
                    economy
                  </p>
                  <Link to="/startup" style={{ textDecoration: "none" }}>
                    <p>Learn more</p>
                  </Link>
                </div>
                <div className="svg-circle1">
                  <img src={build} alt="illustration" />
                </div>
                <div>
                  <h3>Grazac Talent City</h3>
                  <p>
                    A lab where your imagination meets execution. With the right
                    tools and talents, we propel your idea and drive your vision
                    forward to become a viable start-up venture in the global
                    economy
                  </p>
                  <a
                    href="https://grazactalentcity.com/"
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <p>Learn more</p>
                  </a>
                </div>
              </div>
            </div>
            <div className="section1">
              <div className="landing_wwd-four">
                <div className="svg-circle1">
                  <img src={academy} alt="illustration" />
                </div>
                <div>
                  <h3>Grazac Academy</h3>
                  <p>
                    Get equipped in the right platform to upskill yourself for
                    the future of the work you desire. Gain insights into
                    today’s tech skills and tools needed in the digital age{" "}
                  </p>
                  <a
                    href="https://grazacacademy.com/"
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <p>Learn more</p>
                  </a>
                </div>
                <div className="svg-circle1">
                  <img src={working} alt="illustration" />
                </div>
                <div>
                  <h3>Grazac Co-Working Space</h3>
                  <p>
                    Beautifully designed shared workspace for entrepreneurs,
                    freelancers and businesses that allow for innovative ideas,
                    increased motivation and collaboration. With our shared
                    office space, there is no need for an expensive move. All
                    your technology needs are sorted out
                  </p>
                  <Link to="/workspace" style={{ textDecoration: "none" }}>
                    <p>Learn more</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="container">
          <div className="landing_featured">
            <div className="landing_featured-text">
              <p>PARTNERS</p>
              <h1>Brands we Partnered with/As seen on</h1>
            </div>
            <div className="landing_featured-logos">
              <div>
                <img src={andela} alt="logos" />
              </div>
              <div>
                <img src={fieldinsight} alt="logos" />
              </div>
              <div>
                <img src={dc} alt="logos" />
              </div>
              <div>
                <img src={abeg} alt="logos" />
              </div>
              <div>
                <img src={busha} alt="logos" />
              </div>
              <div>
                <img src={farmcrowdy} alt="logos" />
              </div>
              <div>
                <img src={cowrywise} alt="logos" />
              </div>
              <div>
                <img src={dear} alt="logos" />
              </div>
              <div>
                <img src={axa} alt="logos" />
              </div>
              <div>
                <img src={betway} alt="logos" />
              </div>
              <div>
                <img src={ariga} alt="logos" />
              </div>
              <div>
                <img src={decagon} alt="logos" />
              </div>
              <div>
                <img src={eyowo} alt="logos" />
              </div>
              <div>
                <img src={ehealth} alt="logos" />
              </div>
              <div>
                <img src={barter} alt="logos" />
              </div>
            </div>
          </div>
        </div> */}
        <div className="landing__partners">
          <div className="landing__partners-box">
            <div className="landing__partners-text">
              <p className="muted muted-1">Partners </p>
              <h2 className="subheader subheader-purple">
                Brands we Partnered with/As seen on
              </h2>
            </div>
            <div className="landing__partners-container">
              <div className="landing__partners-img">
                <img src={pettysave} alt="pettysave" />
              </div>
              <div className="landing__partners-img">
                <img src={businessday} alt="pettysave" />
              </div>
              <div className="landing__partners-img">
                <img src={tg} alt="tg" />
              </div>
              <div className="landing__partners-img">
                <img src={google} alt="google" />
              </div>
              <div className="landing__partners-img">
                <img src={haptic} alt="haptic" />
              </div>
            </div>
            <Splide options={options} className="landing__partners-wrapper">
              {/* <SplideSlide className="landing__partners-img2">
                <img src={tg2} alt="pettysave" />
              </SplideSlide> */}

              <SplideSlide className="landing__partners-img2">
                <img src={pettysave2} alt="pettysave" />
              </SplideSlide>
              <SplideSlide className="landing__partners-img2">
                <img src={businessday2} alt="pettysave" />
              </SplideSlide>
              <SplideSlide className="landing__partners-img2">
                <img src={tg2} alt="pettysave" />
              </SplideSlide>
              <SplideSlide className="landing__partners-img2">
                <img src={haptic2} alt="pettysave" />
              </SplideSlide>
              <SplideSlide className="landing__partners-img2">
                <img src={google2} alt="pettysave" />
              </SplideSlide>
            </Splide>
          </div>
        </div>
        <div className=" nextbigthing">
          <div className="container ">
            <div className="landing_wwd-column1">
              <div className="section2">
                {/* <img src={business} alt="business" className="business" /> */}
              </div>
              <div className="section2 section3">
                <h1>
                  Are you building the
                  <br />
                  next big thing?
                </h1>
                <p>
                  We are passionate about supporting startups solving social
                  problems in Africa.
                </p>
                <Link to="/startup" className="button button-bg">
                  Join Our Startup
                  <img src={arrow} alt="" className="hvr-buzz" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* {blogs.length < 1 ? (
          <div className="blogs__loader">
            <Loader />
          </div>
        ) : ( */}
        <div className="blogs__blog landing__blog">
          <div className="blogs__blog-box">
            <div className="landing__blog-header">
              <h3 className="subheader subheader-purple">Latest Blog</h3>
              <Link to="/blog" className="button button-bg">
                <span>Visit Grazac Blog</span>
                <img src={btnwhite} alt="arrow" />
              </Link>
            </div>
            <div className="blogs__blog-container">
              {blogs.map((blog, index) => {
                return (
                  <a
                    // href={blog.link}
                    href={blogs[index].link}
                    className="blog"
                    target="_blank"
                    rel="noreferrer"
                    key={index}
                  >
                    {blog.description
                      .toString()
                      .match(/<img[^>]+src="([^">]+)"/)[1] && (
                      <div className="blog__img">
                        <img
                          src={
                            blog.description
                              .toString()
                              .match(/<img[^>]+src="([^">]+)"/)[1]
                          }
                          alt="img"
                        />
                      </div>
                    )}
                    <div className="blog__content">
                      <div className="blog__content-container">
                        {/* <h6 className="blogtitle">press release</h6> */}
                        <h3 className="muted muted-1">{blog.title}</h3>

                        <small className="small">{blog.pubDate}</small>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <Subscribe />
      </div>
    </div>
  );
};

export default Landing;
