// @ts-nocheck
// import hamburger from "../images/svg/hamburger.svg";
import Logo from "../images/sidebar.png";
import Cancel from "../images/cancel.png";
import { Link, NavLink } from "react-router-dom";
import btnwhite from "../images/svg/button-arrow.svg";
import { useEffect } from "react";

const Sidebar = ({ animate, setShow, clickContact }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div
      className={["sidebar animate__animated animate__slow", animate].join(" ")}
    >
      <div className="sidebar__container">
        <div className="sidebar__header">
          <Link to="/" onClick={() => setShow(false)}>
            <img src={Logo} alt="logo" />
          </Link>
          <div className="sidebar__cancel" onClick={() => setShow(false)}>
            <img src={Cancel} alt="go back" />
          </div>
        </div>
        <nav className="sidebar__nav">
          <ul className="sidebar__items">
            <li onClick={() => setShow(false)} className="sidebar__item">
              <NavLink className="sidebar__link" to="/about">
                {" "}
                About Us
              </NavLink>
            </li>
            <li
              onClick={() => setShow(false)}
              className="sidebar__item"
              to="/startup"
            >
              <NavLink className="sidebar__link" to="/startup">
                {" "}
                Startups
              </NavLink>
            </li>
            <li
              onClick={() => setShow(false)}
              className="sidebar__item"
              to="/workspace"
            >
              <NavLink className="sidebar__link" to="/workspace">
                {" "}
                Co-working Space
              </NavLink>
            </li>
            <li
              onClick={() => setShow(false)}
              className="sidebar__item"
              
            >
              <a className="sidebar__link" href="https://www.grazactalentcity.com/" target="_blank" rel="noreferrer" >
                {" "}
                Grazacac Talent City
              </a>
            </li>
            <li
              onClick={() => setShow(false)}
              className="sidebar__item"
              to="/academy"
            >
              <a
                className="sidebar__link"
                href="https://www.grazacacademy.com"
                rel="noreferrer"
                target="_blank"
              >
                {" "}
                Grazac Academy
              </a>
            </li>
            <li
              onClick={() => setShow(false)}
              className="sidebar__item"
              to="/blog"
            >
              <NavLink className="sidebar__link" to="/blog">
                {" "}
                Blog
              </NavLink>
            </li>
          </ul>
        </nav>
        <a className="sidebar__contact" href="/contact" >
          <button className="button button-bg">
            <span>Contact</span>
            <img src={btnwhite} alt="Arrow" />
          </button>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
