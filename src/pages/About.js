// @ts-nocheck
import { useEffect } from "react";
import Subscribe from "../components/subscribe";

import work from "../images/website/IMG_8304-2.JPG";
import impact from "../images/impact.png";
import dot from "../images/svg/dot.svg";
import about3 from "../images/website/IMG_7513.jpg";
import about4 from "../images/website/IMG_8350-2.jpg";
import Scroll from "../components/Scroll";
import { Helmet } from "react-helmet";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Helmet>
        <title>About - Grazac</title>
        <meta
          name="description"
          content="We are a team of young talented youths accelerating development of new innovations in Africa. We call ourselves Grazacians because we believe we can change the world."
        />
        <meta name="theme-color" content="#773DD3" />
        <meta
          property="og:description"
          content="We are a team of young talented youths accelerating development of new innovations in Africa. We call ourselves Grazacians because we believe we can change the world."
        ></meta>
        <meta property="og:title" content="GRAZAC TECHNOLOGIES"></meta>
        <meta name="twitter:title" content="GRAZAC TECHNOLOGIES"></meta>
        <meta property="og:url" content="https://www.grazac.com.ng/" />
      </Helmet>
      <div className="about">
        <div className="about_top">
          <div className="about_top-text container">
            <h1 className="title">About Us</h1>
            <p className="muted muted-1">
              We are a team of young talented youths accelerating development of
              new innovations in Africa. We call ourselves Grazacians because we
              believe we can change the world.
            </p>
          </div>
          <div className="about_top-images">
            <div className="about_top-images-item">
              <div className="item-inside about1"></div>
              <div className="item-inside2 about2"></div>
            </div>
            <div className="about_top-images-item">
              <img src={about3} alt="about" className="about3" />
            </div>
            <div className="about_top-images-item item-hide">
              <img src={about4} alt="about" className="about4" />
            </div>
            <div className="about_top-images-item item-hide">
              <div className="item-inside about5"></div>
              <div className="item-inside2 about6"></div>
            </div>
            <div className="about_top-images-item item-hide">
              <div className="item-inside about7"></div>
              <div className="item-inside2 about8"></div>
            </div>
          </div>
        </div>
        <div style={{ height: "20vw" }}></div>
        {/* <div className="about_slide">
          <div className="container">
            <p>FEATURED & PARTNERS</p>
            <h2>Come work with us</h2>
          </div>
          <div className="container">
            <div className="about_slide-impact">
              <div className="about_slide-impact-view">
                <img src={impact} alt="impact" />
                <img src={impact} alt="impact" />
                <img src={impact} alt="impact" />
              </div>
            </div>
          </div>
        </div> */}
        <div className="about_define">
          <div className="container">
            <p>What defines us</p>
            <h2>Our Core Values</h2>
            <div className="about_define-cards">
              <div className="about_define-cards-box1 hvr-grow">
                <div className="tri"></div>
                <h3>Creativity</h3>
                <p>
                  We constantly develop ideas that drive innovation. Our company
                  is a community that allows us to share common interests and
                  ideas.
                </p>
              </div>
              <div className="about_define-cards-box1 hvr-grow">
                <div className="tri"></div>
                <h3>Quality</h3>
                <p>
                  We strive to provide value that fulfils and exceeds
                  expectations. We have an unwavering guide that leads the way
                  to fulfilling your goal.
                </p>
              </div>
              <div className="about_define-cards-box1 hvr-grow">
                <div className="tri"></div>
                <h3>Passion</h3>
                <p>
                  Our enthusiasm to deliver the best makes us unique. We uphold
                  the highest standards in deliverability.
                </p>
              </div>
            </div>
            <div className="about_define-cards">
              <div className="about_define-cards-box1 hvr-grow">
                <div className="tri"></div>
                <h3>Commitment</h3>
                <p>
                  We are focused on giving the best solutions. Our concern is
                  solving your problem rather than why or how the problem was
                  created.
                </p>
              </div>
              <div className="about_define-cards-box1 hvr-grow">
                <div className="tri"></div>
                <h3>Teamwork</h3>
                <p>
                  We do better, together. Our environment fosters progress,
                  effectiveness and speed.
                </p>
              </div>
              <div className="about_define-cards-box1 hvr-grow">
                <div className="tri"></div>
                <h3>Innovation</h3>
                <p>
                  Transfer or adapt your product, business model and operations
                  to become a sustainable business to the very core business to
                  the very core.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="about_work">
          <div className="container">
            <p>
              We are always looking out for talented youths ready to change the
              world with us.
            </p>
            <h2>Let’s work together</h2>
            {/* <div style={{ display: "flex" }}> */}
            {/* <img src={dot} alt="" /> */}
            {/* <p className="options">See all Options</p> */}
            {/* </div> */}
            <p>
              Send us a mail to{" "}
              <a href="mailto:jobs@grazac.com.ng">jobs@grazac.com.ng</a>
            </p>
          </div>
          <img
            src={work}
            alt="grazac"
            width="100%"
            style={{ margin: "20px 0 50px" }}
          />
        </div>
      </div>
      <Subscribe />
      <Scroll />
    </div>
  );
};

export default About;
