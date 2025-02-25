import { Link } from "react-router-dom";

const Modal = ({ animate, close, children }) => {
  return (
    <div
      className={["popup animate__animated animate__fast", animate].join(" ")}
      // onClick={close}
    >
      <div className="popup__container">
        <div className="popup__box">
          <div className="popup__content">
            {children}
            <Link to="/" className="button button-bg" onClick={close}>
              Back to Home
            </Link>
          </div>
          {/* <div onClick={close} className="popup__cancel">
            <span>X</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
