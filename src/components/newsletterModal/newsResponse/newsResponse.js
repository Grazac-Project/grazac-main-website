import NewsletterModal from "../newsletterModal";
import classes from "./newsResponse.module.css";
import Message from "../../../images/newsletter/message-2.png";
import { Link } from "react-router-dom";

const NewsResponse = ({ setNews, newsMessage }) => {
  console.log(newsMessage);

  return (
    <NewsletterModal setNews={setNews}>
      <div className={classes.main}>
        <img src={Message} alt="icon" />
        <div>
          <h2>
            {newsMessage
              ? "Oh!, we already have you on our mailing list."
              : "Thank you for subscribing to our newsletter!"}
          </h2>
          {newsMessage ? (
            <Link onClick={() => setNews("showNews")}>
              Try another email instaed
            </Link>
          ) : (
            <span>We promise not to spam!</span>
          )}
        </div>
      </div>
    </NewsletterModal>
  );
};

export default NewsResponse;
