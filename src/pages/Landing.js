// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import { FiArrowRight, FiLayers } from "react-icons/fi";
import "../styles/pages.css";

// photography (latest team photos)
import team1 from "../images/website/newabout1.png";
import team2 from "../images/website/newabout2.png";
import team3 from "../images/website/newabout3.png";
import team4 from "../images/website/newabout4.png";
import team5 from "../images/website/newabout5.png";
import team7 from "../images/website/newabout7.png";
import teamMeeting from "../images/website/about-spread.png";
import spaceImg from "../images/redesign/space.jpg";

// partner logos
import google from "../images/google.png";
import haptic from "../images/haptic.png";
import businessday from "../images/businessday.png";
import pettysave from "../images/pettysave.png";
import tg from "../images/tg.png";

const offerings = [
  {
    title: "Grazac Innovation Lab",
    text: "Where imagination meets execution. We give start-ups the tools, talent, mentorship and funding access to grow into viable ventures.",
    image: team7,
    cta: "Join the lab",
    to: "/startup",
  },
  {
    title: "Grazac Academy",
    text: "Upskill for the future of work you desire. Learn today's in-demand tech skills and the tools needed to thrive in the digital age.",
    image: team2,
    cta: "Start learning",
    href: "https://grazacacademy.com/",
  },
  {
    title: "Co-Working Space",
    text: "A beautifully designed shared workspace with reliable power and fast internet, for entrepreneurs, freelancers and teams.",
    image: spaceImg,
    cta: "Book a space",
    to: "/bookSpace",
  },
];

const partners = [
  { name: "PettySave", logo: pettysave },
  { name: "BusinessDay", logo: businessday },
  { name: "TG", logo: tg },
  { name: "Google Digital Skills for Africa", logo: google },
  { name: "Haptic", logo: haptic },
];

const imageFromPost = (post) => {
  if (post.thumbnail) return post.thumbnail;
  const match = String(post.description || "").match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
};

const formatDate = (value) => {
  const date = new Date(String(value).replace(" ", "T"));
  return isNaN(date)
    ? ""
    : date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
};

const OfferCard = ({ item, index }) => {
  const button = (
    <>
      <span className="gz-pill__dot" aria-hidden="true">
        <FiArrowRight />
      </span>
      {item.cta}
    </>
  );

  return (
    <article
      className="gz-offer"
      data-aos="fade-up"
      data-aos-delay={index * 100}
      data-aos-once="true"
    >
      <div className="gz-offer__img">
        <img src={item.image} alt="" loading="lazy" />
      </div>
      <div className="gz-offer__body">
        <h3 className="gz-h3">{item.title}</h3>
        <p className="gz-body">{item.text}</p>
        {item.href ? (
          <a className="gz-pill" href={item.href} target="_blank" rel="noreferrer">
            {button}
          </a>
        ) : (
          <Link className="gz-pill" to={item.to}>
            {button}
          </Link>
        )}
      </div>
    </article>
  );
};

const Landing = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogState, setBlogState] = useState("loading");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let active = true;
    axios
      .get("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@grazac")
      .then((res) => {
        if (!active) return;
        const items = (res.data && res.data.items) || [];
        setBlogs(items.slice(0, 3));
        setBlogState(items.length ? "ready" : "empty");
      })
      .catch(() => active && setBlogState("empty"));
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="gz">
      <Helmet>
        <title>Home - Grazac</title>
        <meta name="description" content="IDEAS, PEOPLE AND A SMART FUTURE" />
        <meta name="theme-color" content="#773DD3" />
        <meta property="og:description" content="IDEAS, PEOPLE AND A SMART FUTURE"></meta>
        <meta property="og:title" content="GRAZAC TECHNOLOGIES"></meta>
        <meta name="twitter:title" content="GRAZAC TECHNOLOGIES"></meta>
        <meta property="og:url" content="https://www.grazac.com.ng/" />
      </Helmet>

      {/* Hero */}
      <section className="gz-hero">
        <div className="gz-container gz-hero__grid">
          <div className="gz-hero__copy">
            <span className="gz-eyebrow">Welcome to Grazac</span>
            <h1 className="gz-display">
              Ideas, people and a <span className="gz-accent">smart future.</span>
            </h1>
            <p className="gz-lead">
              We are building an ecosystem that facilitates technology entrepreneurship while
              enhancing economic development.
            </p>
            <div className="gz-actions">
              <Link to="/contact" className="gz-btn gz-btn--primary">
                Partner with us <FiArrowRight />
              </Link>
              <a href="#ecosystem" className="gz-btn gz-btn--ghost">
                Explore our ecosystem
              </a>
            </div>
          </div>

          <div className="gz-hero__media gz-hero__media--collage" data-aos="fade-left" data-aos-once="true">
            <div className="gz-collage">
              <div className="gz-collage__col">
                <figure><img src={team1} alt="The Grazac team" /></figure>
                <figure><img src={team7} alt="Grazacians collaborating at a desk" /></figure>
              </div>
              <div className="gz-collage__col">
                <figure className="gz-collage__tall"><img src={team3} alt="Two Grazacians sharing a laugh" /></figure>
                <figure><img src={team5} alt="Grazacians together" /></figure>
              </div>
              <div className="gz-collage__col">
                <figure className="gz-collage__tall"><img src={team4} alt="A Grazacian on a call" /></figure>
              </div>
            </div>
            <div className="gz-chip gz-hero__chip">
              <span className="gz-chip__icon">
                <FiLayers />
              </span>
              <span>
                <strong>One ecosystem</strong>
                Lab · Talent · Academy · Space
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Our offerings */}
      <section className="gz-section gz-section--tint" id="ecosystem">
        <div className="gz-container">
          <div className="gz-section-head">
            <span className="gz-eyebrow">What we do</span>
            <h2 className="gz-h2">Our offerings</h2>
            <p className="gz-lead">
              We develop, support and scale tech innovations. Here's a quick overview of how we
              can help you take your idea or business a step further.
            </p>
          </div>
          <div className="gz-offers">
            {offerings.map((item, index) => (
              <OfferCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="gz-partners" aria-label="Partners">
        <div className="gz-container">
          <p className="gz-partners__title">Brands we've partnered with &amp; as seen on</p>
        </div>
        <div className="gz-marquee">
          <div className="gz-marquee__track">
            {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
              <div
                className="gz-marquee__item"
                key={index}
                aria-hidden={index >= partners.length ? "true" : undefined}
              >
                <img src={partner.logo} alt={partner.name} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Startup CTA */}
      <section className="gz-section">
        <div className="gz-container">
          <div className="gz-panel" data-aos="fade-up" data-aos-once="true">
            <div className="gz-panel__copy">
              <span className="gz-eyebrow gz-eyebrow--dark">Grazac Innovation Lab</span>
              <h2 className="gz-h2">Are you building the next big thing?</h2>
              <p>
                We are passionate about supporting startups solving social problems in Africa.
              </p>
              <div className="gz-actions">
                <Link to="/startup" className="gz-btn gz-btn--light">
                  Join our startup programme <FiArrowRight />
                </Link>
              </div>
            </div>
            <div className="gz-panel__media">
              <img src={teamMeeting} alt="The Grazac team in a meeting" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Blog */}
      {blogState !== "empty" && (
        <section className="gz-section gz-section--tint">
          <div className="gz-container">
            <div className="gz-section-head gz-section-head--row">
              <div>
                <span className="gz-eyebrow">From the blog</span>
                <h2 className="gz-h2">Latest stories</h2>
              </div>
              <Link to="/blog" className="gz-btn gz-btn--ghost">
                Visit Grazac blog <FiArrowRight />
              </Link>
            </div>
            <div className="gz-blog">
              {blogState === "loading"
                ? [0, 1, 2].map((key) => (
                    <div className="gz-post gz-post--skeleton" key={key} aria-hidden="true">
                      <div className="gz-post__img" />
                      <div className="gz-post__body">
                        <div className="gz-skel gz-skel--short" />
                        <div className="gz-skel" />
                        <div className="gz-skel" />
                      </div>
                    </div>
                  ))
                : blogs.map((post, index) => {
                    const image = imageFromPost(post);
                    return (
                      <a
                        href={post.link}
                        className="gz-post"
                        target="_blank"
                        rel="noreferrer"
                        key={post.guid || index}
                      >
                        <div className="gz-post__img">
                          {image && <img src={image} alt="" loading="lazy" />}
                        </div>
                        <div className="gz-post__body">
                          <span className="gz-post__date">{formatDate(post.pubDate)}</span>
                          <h3 className="gz-post__title">{post.title}</h3>
                        </div>
                      </a>
                    );
                  })}
            </div>
          </div>
        </section>
      )}

    </div>
  );
};

export default Landing;
