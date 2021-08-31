// import { Link } from "react-router-dom";


const Button = ({ children, extra, click, disabled }) => {
  return (
    <button
      onClick={click}
      className={["button", extra].join(" ")}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
