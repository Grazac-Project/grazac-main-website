import classes from "./newsletterModal.module.css";
import { ReactComponent as Close } from "../../images/newsletter/close.svg";

const NewsletterModal = ({ children, setNews }) => {
  return (
    <div className={classes.main}>
      <main className={`animate__animated animate__fadeInDown`}>
        <div>{children}</div>
        <button className={classes.close} onClick={() => setNews("")}>
          <Close />
        </button>
      </main>
    </div>
  );
};

export default NewsletterModal;
