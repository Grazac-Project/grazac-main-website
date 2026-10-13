// @ts-nocheck
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FiArrowRight } from "react-icons/fi";
import useSanity from "../lib/useSanity";
import { LATEST_POSTS_QUERY } from "../lib/sanity";
import { PostCard, PostCardSkeleton } from "../components/blog/PostCard";
import "../styles/pages.css";

// photography (latest team photos)
import heroTeam from "../images/redesign/hero-team.jpg";
import team2 from "../images/website/grazacAcademy.jpg";
import team6 from "../images/website/grazacBuild.png";
import team7 from "../images/website/newabout7.png";
import teamMeeting from "../images/website/about-spread.png";
import spaceImg from "../images/website/co-working space.jpeg";

// partner logos
import google from "../images/google.png";
import haptic from "../images/haptic.png";
import businessday from "../images/businessday.png";
import pettysave from "../images/pettysave.png";
import tg from "../images/tg.png";
import threeMTT from "../images/3MTT_Logo_clear_4x.png";
import afdb from "../images/AFDB Logo.png";
import airtel from "../images/Airtel Logo.png";
import amazon from "../images/amazon logo.png";
import apple from "../images/Apple Logo.png";
import boi from "../images/BOI Logo.png";
import flutterwave from "../images/flutterwave-logo.png";
import foundersfriday from "../images/Founders Friday.png";
import freindsOfFigma from "../images/Friends of Figma logo.png";
import googlelogo from "../images/Google logo 1.png";
import idice from "../images/idice_clear_4x.png";
import idiceStartup from "../images/idicexstartupbrige_logo_clear_4x.png";
import ogunTechCommunity from "../images/Ogun tech community logo.png";
import polarisBank from "../images/Polaris bank logo.png";
import prooval from "../images/prooval logo.png";
import tiye from "../images/Tiye logo.png";
import uba from "../images/UBA LOGO.png";
import microsoft from "../images/microsoft logo.png";
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
    cta: "Explore plans",
    to: "/workspace",
  },
  {
    title: "Grazac Build",
    text: "Need a website, app or MVP? Our team designs and builds digital solutions for businesses and startups, from idea to launch.",
    image: team6,
    cta: "Start a project",
    to: "/build",
  },
];

const partners = [
  { name: "PettySave", logo: pettysave },
  { name: "BusinessDay", logo: businessday },
  { name: "TG", logo: tg },
  { name: "Google Digital Skills for Africa", logo: google },
  { name: "Haptic", logo: haptic },
  { name: "3MTT", logo: threeMTT },
  { name: "AFDB", logo: afdb },
  { name: "Airtel", logo: airtel },
  { name: "Amazon", logo: amazon },
  { name: "Apple", logo: apple },
  { name: "BOI", logo: boi },
  { name: "Flutterwave", logo: flutterwave },
  { name: "Founders Friday", logo: foundersfriday },
  { name: "Friends of Figma", logo: freindsOfFigma },
  { name: "Google", logo: googlelogo },
  { name: "idice", logo: idice },
  { name: "idice Startup", logo: idiceStartup },
  { name: "Ogun Tech Community", logo: ogunTechCommunity },
  { name: "Polaris Bank", logo: polarisBank },
  { name: "Prooval", logo: prooval },
  { name: "Tiye", logo: tiye },
  { name: "UBA", logo: uba },
  { name: "Microsoft", logo: microsoft },
];

const partnerRows = [
  partners.slice(0, Math.ceil(partners.length / 2)),
  partners.slice(Math.ceil(partners.length / 2)),
];


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
  const latest = useSanity(LATEST_POSTS_QUERY, { limit: 3 });
  const showBlog =
    latest.status === "loading" || (latest.status === "ready" && latest.data && latest.data.length > 0);

  useEffect(() => {
    window.scrollTo(0, 0);
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
      <section className="gz-hero gz-hero--home">
        <div className="gz-container gz-hero__grid">
          <div className="gz-hero__copy">
            {/* <span className="gz-eyebrow">Welcome to Grazac</span> */}
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

          <div className="gz-hero__media gz-hero__media--single" data-aos="fade-left" data-aos-once="true">
            <div className="gz-hero__photo gz-hero__photo--wide">
              <img src={heroTeam} alt="The Grazac team in front of the Grazac sign" />
            </div>
            {/* <div className="gz-chip gz-hero__chip">
              <span className="gz-chip__icon">
                <FiLayers />
              </span>
              <span>
                <strong>One ecosystem</strong>
                Lab · Talent · Academy · Space
              </span>
            </div> */}
          </div>
        </div>
      </section>

      {/* Our offerings */}
      <section className="gz-section gz-section--tint" id="ecosystem">
        <div className="gz-container">
          <div className="gz-section-head">
            {/* <span className="gz-eyebrow">What we do</span> */}
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
        {partnerRows.map((row, rowIndex) => (
          <div className="gz-marquee" key={rowIndex}>
            <div
              className={`gz-marquee__track${rowIndex === 1 ? " gz-marquee__track--reverse" : ""}`}
            >
              {[0, 1].map((copy) => (
                <div className="gz-marquee__group" key={copy} aria-hidden={copy === 1 || undefined}>
                  {row.map((partner) => (
                    <div className="gz-marquee__item" key={partner.name}>
                      <img src={partner.logo} alt={copy === 0 ? partner.name : ""} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Startup CTA */}
      <section className="gz-section">
        <div className="gz-container">
          <div className="gz-panel" data-aos="fade-up" data-aos-once="true">
            <div className="gz-panel__copy">
              {/* <span className="gz-eyebrow gz-eyebrow--dark">Grazac Innovation Lab</span> */}
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
      {showBlog && (
        <section className="gz-section gz-section--tint">
          <div className="gz-container">
            <div className="gz-section-head gz-section-head--row">
              <div>
                {/* <span className="gz-eyebrow">From the blog</span> */}
                <h2 className="gz-h2">Latest stories</h2>
              </div>
              <Link to="/blog" className="gz-btn gz-btn--ghost">
                Visit Grazac blog <FiArrowRight />
              </Link>
            </div>
            <div className="gz-blog">
              {latest.status === "loading"
                ? [0, 1, 2].map((key) => <PostCardSkeleton key={key} />)
                : latest.data.map((post) => <PostCard key={post._id} post={post} />)}
            </div>
          </div>
        </section>
      )}

    </div>
  );
};

export default Landing;
