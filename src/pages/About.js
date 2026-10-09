// @ts-nocheck
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  FiArrowUpRight,
  FiAward,
  FiBriefcase,
  FiCheck,
  FiHeart,
  FiMail,
  FiZap,
} from "react-icons/fi";
import "../styles/pages.css";

import about1 from "../images/website/newabout1.png";
import about2 from "../images/website/newabout2.png";
import about3 from "../images/website/newabout3.png";
import about4 from "../images/website/newabout4.png";
import about5 from "../images/website/newabout5.png";
import about6 from "../images/website/newabout6.png";
import about7 from "../images/website/newabout7.png";
import about8 from "../images/website/newabout8.png";
import aboutSpread from "../images/website/about-spread.png";

const values = [
  {
    icon: <FiAward />,
    title: "Excellence",
    text: "We consistently strive for excellence in everything we do. It drives us to innovate, refine and improve, so we always deliver our best work.",
  },
  {
    icon: <FiHeart />,
    title: "Empathy",
    text: "Empathy fuels our drive to create solutions that truly make a difference in people's lives, empowering individuals to succeed and thrive in their professional journeys.",
  },
  {
    icon: <FiZap />,
    title: "Execution",
    text: "Ideas alone are not enough. We don't merely set ambitious goals, we pursue them with precision and determination, because consistent action drives success.",
  },
];

const units = [
  { name: "Grazac Innovation Lab", note: "Turning ideas into viable start-ups", to: "/startup" },
  { name: "Grazac Talent City", note: "Nurturing Africa's next tech talent", href: "https://www.grazactalentcity.com/" },
  { name: "Grazac Academy", note: "Tech skills for the future of work", href: "https://www.grazacacademy.com" },
  { name: "Grazac Co-Working Space", note: "A workspace built for focus and collaboration", to: "/workspace" },
];

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="gz">
      <Helmet>
        <title>About - Grazac</title>
        <meta
          name="description"
          content="We are a team of young talented youths accelerating development of new innovations in Africa. We call ourselves Grazacians because we believe we can change the world."
        />
        <meta name="theme-color" content="#773DD3" />
        <meta
          property="og:description"
          content="We are a team of young talented youths accelerating development of new innovations in Africa. We call ourselves Grazacians because we believe we can change the world."
        ></meta>
        <meta property="og:title" content="GRAZAC TECHNOLOGIES"></meta>
        <meta name="twitter:title" content="GRAZAC TECHNOLOGIES"></meta>
        <meta property="og:url" content="https://www.grazac.com.ng/about" />
      </Helmet>

      {/* Hero */}
      <section className="gz-hero gz-about-hero">
        <div className="gz-container">
          <div className="gz-about-hero__head">
            <div className="gz-copy">
              {/* <span className="gz-eyebrow">About Grazac</span> */}
              <h1 className="gz-display">
                We are <span className="gz-accent">Grazacians.</span>
              </h1>
            </div>
            <p className="gz-lead">
              A team of young, talented people accelerating the development of new innovations in
              Africa. We call ourselves Grazacians because we believe we can change the world.
            </p>
          </div>

          <div className="gz-mosaic" data-aos="fade-up" data-aos-once="true">
            <div className="gz-mosaic__col">
              <figure><img src={about1} alt="The Grazac team" /></figure>
              <figure><img src={about2} alt="Grazacians in a workshop" /></figure>
            </div>
            <div className="gz-mosaic__col">
              <figure className="gz-mosaic__tall"><img src={about3} alt="Two Grazacians sharing a laugh" /></figure>
            </div>
            <div className="gz-mosaic__col">
              <figure><img src={about5} alt="Grazacians together" /></figure>
              <figure><img src={about8} alt="A Grazac team meeting" /></figure>
            </div>
            <div className="gz-mosaic__col">
              <figure className="gz-mosaic__tall"><img src={about4} alt="A Grazacian on a call" /></figure>
            </div>
            <div className="gz-mosaic__col">
              <figure><img src={about6} alt="Grazacians working on a laptop" /></figure>
              <figure><img src={about7} alt="Grazacians collaborating at a desk" /></figure>
            </div>
          </div>
        </div>
      </section>

      {/* Who we are */}
      <section className="gz-section gz-section--tint">
        <div className="gz-container gz-split gz-split--top">
          <div className="gz-split__copy">
            {/* <span className="gz-eyebrow">Who we are</span> */}
            <h2 className="gz-h2">Hassle-free funding for technology entrepreneurs</h2>
            <p className="gz-lead">
              Leveraging science, technology and innovation, we support member hubs and their
              communities through four connected units.
            </p>
          </div>
          <ul className="gz-units">
            {units.map((unit, index) => {
              const inner = (
                <>
                  <span className="gz-checklist__icon">
                    <FiCheck />
                  </span>
                  <span>
                    <strong>{unit.name}</strong>
                    <small>{unit.note}</small>
                  </span>
                  <FiArrowUpRight className="gz-units__arrow" />
                </>
              );
              return (
                <li key={unit.name} data-aos="fade-up" data-aos-delay={index * 80} data-aos-once="true">
                  {unit.href ? (
                    <a href={unit.href} target="_blank" rel="noreferrer">
                      {inner}
                    </a>
                  ) : (
                    <Link to={unit.to}>{inner}</Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Core values */}
      <section className="gz-section">
        <div className="gz-container">
          <div className="gz-section-head gz-section-head--center">
            {/* <span className="gz-eyebrow">What defines us</span> */}
            <h2 className="gz-h2">Our core values</h2>
            <p className="gz-lead">Three principles guide how we build, support and show up for our community.</p>
          </div>
          <div className="gz-cards-3">
            {values.map((value, index) => (
              <article
                className="gz-feature"
                key={value.title}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-once="true"
              >
                <span className="gz-feature__num">0{index + 1}</span>
                <span className="gz-feature__icon">{value.icon}</span>
                <h3 className="gz-h3">{value.title}</h3>
                <p className="gz-body">{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Careers */}
      <section className="gz-section" style={{ paddingTop: 0 }}>
        <div className="gz-container">
          <div className="gz-panel" data-aos="fade-up" data-aos-once="true">
            <div className="gz-panel__copy">
              {/* <span className="gz-eyebrow gz-eyebrow--dark">Let's work together</span> */}
              <h2 className="gz-h2">Ready to change the world with us?</h2>
              <p>
                We are always looking out for talented young people who want to build the future of
                technology in Africa.
              </p>
              <div className="gz-actions">
                <a href="mailto:jobs@grazac.com.ng" className="gz-btn gz-btn--light">
                  <FiMail /> jobs@grazac.com.ng
                </a>
                <a
                  href="https://grazac.breezy.hr/"
                  target="_blank"
                  rel="noreferrer"
                  className="gz-btn gz-btn--outline-light"
                >
                  <FiBriefcase /> Open roles <FiArrowUpRight />
                </a>
              </div>
            </div>
            <div className="gz-panel__media">
              <img src={aboutSpread} alt="The Grazac team in a meeting" loading="lazy" />
            </div>
          </div>
          {/* <p style={{ textAlign: "center", marginTop: 32 }}>
            <Link to="/contact" className="gz-link">
              Or get in touch with our team <FiArrowRight />
            </Link>
          </p> */}
        </div>
      </section>

    </div>
  );
};

export default About;
