import React from "react";
import { Link } from "react-router-dom";
import blacklogo from "../images/svg/grazac-logos/black-logo.svg";
// import ShowContext from "../showContext";

const Footer = () => {
  // const { reveal, modalReveal } = React.useContext(ShowContext);
  return (
    <div className="footer">
      {/* <div className="container"> */}
      <div className="container ">
        <div className="footer_bodies">
          <div className="section4">
            <Link to="/">
              <img src={blacklogo} alt="" />
            </Link>
          </div>
          <div className="footer_bodies-innerflex section5">
            <div className="footer_bodies-innerflex-1">
              <h3>Useful Links</h3>
              <Link to="/about">About</Link>
              <Link to="/blog">Our Blog</Link>
              <a
                href="https://grazac.breezy.hr/"
                target="_blank"
                rel="noreferrer"
              >
                Careers{" "}
              </a>
              <Link to="/contact">Contact us</Link>
            </div>
            <div>
              <h3>Events & Community</h3>
              {/* <p onClick={modalReveal}>Ogun Digital Summit</p> */}
              <a
                href="https://www.ogundigitalsummit.com/"
                target="_blank"
                rel="noreferrer"
              >
                Ogun Digital Summit
              </a>
              {/* <p onClick={modalReveal}>Grazac Digital Summit</p>
              <p onClick={modalReveal}>Grazac Javascript Community</p> */}
              {/* <p onClick={modalReveal}>Web3 Community</p> */}
              {/* <p onClick={modalReveal}>Hackathon</p>
               */}
              {/* <Link to="#">Web3 Community</Link> */}
              <a
                href="https://discord.gg/jVhfxsSC"
                target="_blank"
                rel="noreferrer"
              >
                Web3 Community
              </a>
              <Link to="#">General Community</Link>
            </div>
          </div>
          <div className="footer_bodies-innerflex section5">
            <div className="footer_bodies-innerflex-1">
              <h3>Startup Support</h3>
              {/* <p onClick={modalReveal}> Become an Investor</p>
              <p onClick={modalReveal}>Apply as a Mentor</p>
              <p onClick={modalReveal}>Pitch your Startup</p> */}
              <Link to="#">Become an Investor</Link>
              <Link to="#">Apply as a Mentor</Link>
              <Link to="/startup">General Community</Link>
            </div>
            <div>
              <h3>Units</h3>
              <a
                href="https://www.grazacacademy.com"
                target="_blank"
                rel="noreferrer"
              >
                Academy
              </a>

              <Link to="/innovation">Innovation Lab</Link>
              <Link to="/workspace">Workspace</Link>
              <a
                href="https://www.grazactalentcity.com"
                target="_blank"
                rel="noreferrer"
              >
                Grazac Talent City
              </a>
            </div>
          </div>
        </div>
        <hr />
        <div className="footer_copyright">
          <p className="copy">Copyright {new Date().getFullYear()} Grazac</p>
          <p className="terms">
            Terms & Condition<span>Privacy Policy</span>{" "}
          </p>
        </div>
      </div>
      {/* <Modal /> */}
    </div>
  );
};

export default Footer;
