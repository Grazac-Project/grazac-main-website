import { Link } from "react-router-dom";
//import Logo from "../images/logo-head.png";
import Logo from "../images/logo-full.png";
import NavItem from "./Nav";
import hamburger from "../images/svg/hamburger.svg";
import btnpurple from "../images/svg/button-arrow-purple.svg";
// import ShowContext from "../showContext";
import React from "react";

const Header = ({ click }) => {
  // const { reveal } = React.useContext(ShowContext);
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__img__box">
          <img src={Logo} alt="grazac" />
        </Link>
        <nav className="nav">
          <ul className="nav__list">
            <NavItem to="/about">About Us</NavItem>
            <NavItem to="/startup">Startups</NavItem>
            <NavItem to="/workspace">Co-working Space</NavItem>
            <NavItem to="/build">Grazac Build</NavItem>

            <NavItem to="/blog">Blog</NavItem>
          </ul>
        </nav>
        {/* <div className="header__contact" onClick={reveal}> */}
        <a href="/contact" className="header__contact">
          <span>Contact</span>
          <div>
            <img src={btnpurple} alt="arrow" className="hvr-buzz" />
          </div>
        </a>
        <div onClick={click} className="header__hamburger">
          <img src={hamburger} alt="icon" />
        </div>
      </div>
    </header>
  );
};

export default Header;
