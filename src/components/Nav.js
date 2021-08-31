import { NavLink } from "react-router-dom";

const NavItem = ({ children, to }) => {
  return (
    <>
      <li className="nav__item">
        <NavLink
          activeStyle={{
            color: "#773DD3",
          }}
          to={to}
          className="nav__link"
        >
          {children}
        </NavLink>
      </li>
    </>
  );
};

export default NavItem;
