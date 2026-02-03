import React, { useEffect, useState } from "react";
import executive from "../images/book/executive.png";
import desk from "../images/book/desk.png";
import meeting from "../images/book/meeting.png";
import relaxation from "../images/book/relaxation.png";
import executive2 from "../images/book/executive2.png";
import desk2 from "../images/book/desk2.png";
import meeting2 from "../images/book/meeting2.png";
import relaxation2 from "../images/book/relaxation2.png";

import icon1 from "../images/book/icon1.svg";
import icon2 from "../images/book/icon2.svg";
import icon3 from "../images/book/icon3.svg";
import icon4 from "../images/book/icon4.svg";
import icon5 from "../images/book/icon5.svg";
import icon6 from "../images/book/icon6.svg";
import { Helmet } from "react-helmet";
import user from "../images/book/user.png";
import line from "../images/book/underline.png";
import Tour from "../components/Tour/Tour";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Images, Testimony } from "../constants";
import Join from "../components/join/join";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Innovation = () => {
  const [selectedOffer, setSelectedOffer] = useState(0);
  const [tour, setTour] = useState(false);
  const [join, setJoin] = useState(false);


  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedOffer((prevSelectedOffer) => (prevSelectedOffer + 1) % 4);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const handleClick = (index) => {
    setSelectedOffer(index);
  };
  const options = {
    type: "loop",
    width: "100%",
    gap: "10px",
    autoplay: true,
    pauseOnHover: true,
    resetProgress: false,
    arrows: true,
    dots: false,
    perPage: 1,

  };
  const options2 = {
    width: "100%",
    type: "loop",
    gap: "10px",
    autoplay: true,
    pauseOnHover: true,
    resetProgess: false,
    arrows: false,
    dots: false,
    speed: 1000,
    easing: "cubic-bezier(0.5, 0, 0.5, 0.5)",
    768: {
      // gap: "5px",
      arrows: false,
      perPage: 1,
    },

  };
  const texts = ["productivity", "creativity"];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2000);

    return () => {
      clearInterval(intervalId);
      // clearInterval(Image);
    };
  }, [texts.length]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="innovation">
      <Helmet>
        <title>Workspace - Grazac</title>
        <meta
          name="description"
          content="A creative environment that will boost your productivity"
        />
        <meta name="theme-color" content="#773DD3" />
        <meta
          property="og:description"
          content="A creative environment that will boost your productivity"
        ></meta>
        <meta property="og:title" content="Workspace - Grazac"></meta>
        <meta name="twitter:title" content="Workspace - Grazac"></meta>
        <meta property="og:url" content="https://www.grazac.com.ng/workspace" />
      </Helmet>
      {join && <Join join={join} setJoin={setJoin} />}
      <Tour tour={tour} setTour={setTour} />

      <div className="innovation_hero">
        <div className="innovation_hero_text">
          <h4>
            A creative environment that will boost your{" "}
            <span>{texts[currentIndex]}</span>
          </h4>
          <Link to="/bookSpace">
            <button>
              Book a space
            </button>
          </Link>

        </div>
      </div>
      <div className="innovation_offer">
        <div className="innovation_offer_wrapper">
          <div className="innovation_offer_wrapper_text">
            <h5>Our Offers</h5>
            <img src={line} alt="line" className="innovation_line2" />

            <p>
              Don’t just work, work in an environment that inspires you every
              day and affords you the luxury of working, relaxing, and
              networking!
            </p>
          </div>
          <div className="innovation_offer_wrapper_btnFlex">
            <button
              onClick={() => handleClick(0)}
              style={{
                backgroundColor:
                  selectedOffer === 0 ? "#773dd3" : "transparent",
                color: selectedOffer === 0 ? "#ffff" : "#5A5A5A",
              }}
            >
              Executive Boardroom
            </button>
            <button
              onClick={() => handleClick(1)}
              style={{
                backgroundColor:
                  selectedOffer === 1 ? "#773dd3" : "transparent",
                color: selectedOffer === 1 ? "#ffff" : "#5A5A5A",
              }}
            >
              Meeting Rooms
            </button>
            <button
              onClick={() => handleClick(2)}
              style={{
                backgroundColor:
                  selectedOffer === 2 ? "#773dd3" : "transparent",
                color: selectedOffer === 2 ? "#ffff" : "#5A5A5A",
              }}
            >
              Relaxation Space
            </button>
            <button
              onClick={() => handleClick(3)}
              style={{
                backgroundColor:
                  selectedOffer === 3 ? "#773dd3" : "transparent",
                color: selectedOffer === 3 ? "#ffff" : "#5A5A5A",
              }}
            >
              Dedicated Desks
            </button>
          </div>
        </div>
        {selectedOffer === 0 && (
          <div className="innovation_offer_executive">
            <div className="innovation_offer_executive_text">
              <h5>Executive Boardroom</h5>
              <p>
                No matter the nature of your work, our executive rooms match
                your ambition providing you with focus and comfort, either for a
                business meeting or just needing a quiet environment to think
                in.
              </p>
              <div className="innovation_offer_executive_image">
                <img src={executive} alt="build" />
              </div>
            </div>
          </div>
        )}
        {selectedOffer === 1 && (
          <div className="innovation_offer_executive">
            <div className="innovation_offer_executive_text">
              <h5>Meeting Room</h5>
              <p>
                Have productive brainstorming sessions or hold productive
                training sessions with our state-of-the-art well-furnished
                meeting rooms fitted to your taste.
              </p>
              <div className="innovation_offer_executive_image">
                <img src={meeting} alt="build" />
              </div>
            </div>
          </div>
        )}
        {selectedOffer === 2 && (
          <div className="innovation_offer_executive">
            <div className="innovation_offer_executive_text">
              <h5>Relaxation Space</h5>
              <p>
                Get a unique experience with stunning interior elements that
                makes your event memorable. Relax away from your desks and
                recharge with drinks and games before taking on your next task.
              </p>
              <div className="innovation_offer_executive_image">
                <img src={relaxation} alt="build" />
              </div>
            </div>
          </div>
        )}
        {selectedOffer === 3 && (
          <div className="innovation_offer_executive">
            <div className="innovation_offer_executive_text">
              <h5>Dedicated Desk</h5>
              <p>
                Elevate your professionalism with your clients with our
                dedicated desk designed to give that personalized, reliable, and
                consistent workspace just for you.
              </p>
              <div className="innovation_offer_executive_image">
                <img src={desk} alt="build" />
              </div>
            </div>
          </div>
        )}
        <div
          style={{
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "95%",
          }}
        >
          <Splide options={options2} >
            <SplideSlide className="innovation_offer_wrapper2">
              <div className="innovation_offer_wrapper2_btn">
                <button>Executive Boardroom</button>
              </div>
              <div className="innovation_offer_executive2">
                <div className="innovation_offer_executive_2text">
                  <h5>Executive Boardroom</h5>
                  <p>
                    No matter the nature of your work, our executive rooms match
                    your ambition providing you with focus and comfort, either
                    for a business meeting or just needing a quiet environment
                    to think in.
                  </p>
                  <div>
                    <img src={executive2} alt="build" />
                  </div>
                </div>
              </div>
            </SplideSlide>
            <SplideSlide className="innovation_offer_wrapper2">
              <div className="innovation_offer_wrapper2_btn">
                <button>Meeting Rooms</button>
              </div>
              <div className="innovation_offer_executive2">
                <div className="innovation_offer_executive2_text">
                  <h5>Meeting Room</h5>
                  <p>
                    Have productive brainstorming sessions or hold productive
                    training sessions with our state-of-the-art well-furnished
                    meeting rooms fitted to your taste.
                  </p>
                  <div>
                    <img src={meeting2} alt="build" />
                  </div>
                </div>
              </div>
            </SplideSlide>
            <SplideSlide className="innovation_offer_wrapper2">
              <div className="innovation_offer_wrapper2_btn">
                <button>Relaxation Space</button>
              </div>
              <div className="innovation_offer_executive2">
                <div className="innovation_offer_executive2_text">
                  <h5>Relaxation Space</h5>
                  <p>
                    Get a unique experience with stunning interior elements that
                    makes your event memorable. Relax away from your desks and
                    recharge with drinks and games before taking on your next
                    task.
                  </p>
                  <div>
                    <img src={relaxation2} alt="build" />
                  </div>
                </div>
              </div>
            </SplideSlide>
            <SplideSlide className="innovation_offer_wrapper2">
              <div className="innovation_offer_wrapper2_btn">
                <button>Dedicated Desks</button>
              </div>
              <div className="innovation_offer_executive2">
                <div className="innovation_offer_executive2_text">
                  <h5>Dedicated Desk</h5>
                  <p>
                    Elevate your professionalism with your clients with our
                    dedicated desk designed to give that personalized, reliable,
                    and consistent workspace just for you.
                  </p>
                  <div>
                    <img src={desk2} alt="build" />
                  </div>
                </div>
              </div>
            </SplideSlide>
          </Splide>
        </div>
      </div>

      <div className="innovation_benefit">
        <h5>Benefits of using our co-working space</h5>
        <div className="innovation_benefit_grid">
          <div className="innovation_benefit_grid_items">
            <img src={icon1} alt=" img" />
            <h6>40+ Dedicated Desk</h6>
            <p>
              Dedicated desk space for other events of interest you might be
              considering hosting, ranging from sip and paints to tech hangouts,
              etc.
            </p>
          </div>
          <div className="innovation_benefit_grid_items">
            <img src={icon2} alt=" img" />
            <h6>Cleaning Services</h6>
            <p>
              A clean work environment makes all the difference and we worry
              about that on your behalf!
            </p>
          </div>{" "}
          <div className="innovation_benefit_grid_items">
            <img src={icon3} alt=" img" />
            <h6>24-hours Power Supply</h6>
            <p>
              Enjoy eco-friendly uninterrupted power supply throughout your
              stay.
            </p>
          </div>{" "}
          <div className="innovation_benefit_grid_items">
            <img src={icon4} alt=" img" />

            <h6>High-speed Internet</h6>
            <p>Unbeatable internet speed for seamless working and meetings.</p>
          </div>{" "}
          <div className="innovation_benefit_grid_items">
            <img src={icon5} alt=" img" />
            <h6>Car Parking Space</h6>
            <p>
              Worried about where to park your car? We have that covered as our
              workspace comes with secure parking spaces for you.
            </p>
          </div>
          <div className="innovation_benefit_grid_items">
            <img src={icon6} alt=" img" />

            <h6>Conducive Environment</h6>
            <p>
              Another outstanding thing about our space is the ambience and how
              conducive our space is, which helps your creative juices flow
              easily.
            </p>
          </div>
        </div>
      </div>
      <div className="innovation_gallery">
        <div className="innovation_gallery_text">
          <h1>Gallery</h1>
          <img src={line} alt="line" className="innovation_line" />

          <p>Immersive beautiful, co-working space</p>
          <div className="innovation_gallery_text_userFlex">
            <img src={user} alt="image1" />
            <span> 20,000+ satisfied & Returning users</span>
          </div>
        </div>
        <div className="innovation_slider">
          <div className="innovation_imageCon">
            <div className="innovation_slide2">
              {Images.slice()
                .reverse()
                .map((image) => (
                  <div className="innovation_image">
                    <img
                      key={image.id}
                      src={image.image}
                      alt="galleryPicture"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="innovation_slider">
          <div className="innovation_imageCon">
            <div className="innovation_slide">
              {Images.map((image) => (
                <div className="innovation_image">
                  <img key={image.id} src={image.image} alt="galleryPicture" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="innovation_hero_text">
          <button onClick={() => setTour(true)}>Book a tour</button>
        </div>
      </div>
      <div className="innovation_review">
        <div className="innovation_review_innerCon">
          <h4>Customer testimonials</h4>
          <img src={line} alt="line" className="innovation_line" />

          <p>Hear what people have to say about us.</p>
          <Splide options={options}>
            {Testimony.map((review) => (
              <SplideSlide className="innovation_review_items" key={review.id}>
                <h5>{review.text}</h5>
                <div className="innovation_review_items_flex">
                  {/* <img src={review.image} alt="img" /> */}
                  <div>
                    <h6>{review.name}</h6>
                    <span>{review.skill}</span>
                  </div>
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
      <div className="innovation_community">
        <div className="innovation_community_content">
          <h6>Join other founder, freelancer, makers and many-hat wearers</h6>
          <p>Join Grazac Community and take back control of your day</p>
          <div
            // href="https://chat.whatsapp.com/GdO3hUgbAdbA7MN2cBOjEz"
            // target="_blank"
            // rel="noreferrer"
            style={{ textDecorationLine: "none" }}
          >
            <button onClick={() => setJoin(true)}>Join Community</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Innovation;
