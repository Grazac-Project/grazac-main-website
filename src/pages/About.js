// @ts-nocheck
import { useEffect } from "react";
import Subscribe from "../components/subscribe";

// import work from "../images/website/IMG_8304-2.JPG";
import work from "../images/website/about-spread.png";
import impact from "../images/impact.png";
import dot from "../images/svg/dot.svg";
// import about3 from "../images/website/IMG_7513.jpg";
import about3 from "../images/website/newabout3.png";
// import about4 from "../images/website/IMG_8350-2.jpg";
import about4 from "../images/website/newabout4.png";
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
          {/* <div className="about_top-text container"> */}
          <div className="about_top-text">
            <h1 className="title">Hassle-Free Funding for Technology Entrepreneurs.</h1>
            <p className="muted muted-1">
              Leveraging science, technology and innovation, supporting member hubs and their communities
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
        <div className="about_space-div"></div>
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
          {/* <div className="container"> */}
          <div className="">
            <p className="sub-text">What defines us</p>
            <h2>Our Core Values</h2>
            <div className="about_define-cards">
              <div className="about_define-cards-box1 hvr-grow">
                <div className="tri"></div>
                <h3>Excellence</h3>
                <p>
                  We believe in consistently striving for excellence in everything we do. Our commitment to excellence drives us to continuously innovate, refine, and improve, ensuring we always deliver our best work.
                </p>
              </div>
              <div className="about_define-cards-box1 hvr-grow">
                <div className="tri"></div>
                <h3>Empathy</h3>
                <p>
                  Our drive to create solutions that truly make a difference in people's lives is fuelled by empathy. We are dedicated to empowering individuals to succeed and thrive in their professional journeys. 
                </p>
              </div>
              <div className="about_define-cards-box1 hvr-grow">
                <div className="tri"></div>
                <h3>Execution</h3>
                <p>
                  We understand that ideas alone are not enough; it's consistent action and execution that drive our success. Therefore, we don't merely set ambitious goals, we actively pursue them with precision and determination.
                </p>
              </div>
            </div>
            {/* <div className="about_define-cards">
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
            </div> */}
          </div>
        </div>
        <div className="about_work">
          {/* <div className="container"> */}
          <div className="">
            <h2>Let’s work together</h2>
            <p>
              We are always looking out for talented youths ready to change the
              world with us.
            </p>
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
