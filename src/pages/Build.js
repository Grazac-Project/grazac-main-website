// @ts-nocheck
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  FiArrowRight,
  FiBookOpen,
  FiCheck,
  FiCode,
  FiGlobe,
  FiLifeBuoy,
  FiMousePointer,
  FiPenTool,
  FiSmartphone,
  FiTrendingUp,
} from "react-icons/fi";
import EnquiryForm from "../components/EnquiryForm";
import useSanity from "../lib/useSanity";
import { BUILD_QUERY, imageUrl } from "../lib/sanity";
import "../styles/pages.css";

import teamImg from "../images/redesign/build-team.jpg";

const services = [
  {
    icon: <FiGlobe />,
    title: "Website Development",
    text: "Fast, responsive websites and web applications that represent your brand and work beautifully on every device.",
  },
  {
    icon: <FiSmartphone />,
    title: "Mobile App Development",
    text: "Android and iOS apps designed around your users and built to grow with your business.",
  },
  {
    icon: <FiPenTool />,
    title: "Product Design (UI/UX)",
    text: "User-centred interfaces, prototypes and design systems that make your product easy and enjoyable to use.",
  },
  {
    icon: <FiTrendingUp />,
    title: "MVPs for Startups",
    text: "Turn your idea into a minimum viable product you can test with real users, pitch to investors and scale.",
  },
  {
    icon: <FiBookOpen />,
    title: "Tech Training for Teams",
    text: "Upskill your team in today's in-demand tech skills, delivered by the people behind Grazac Academy.",
  },
  {
    icon: <FiLifeBuoy />,
    title: "Maintenance & Support",
    text: "We monitor, fix and improve your product after launch so it stays fast, secure and up to date.",
  },
];

const steps = [
  {
    title: "Discover",
    text: "We learn your goals, users and requirements, then agree a clear plan and scope.",
  },
  {
    title: "Design",
    text: "We shape a user-centred design and prototype you can review before we build.",
  },
  {
    title: "Build",
    text: "Our engineers develop and test your product, with regular check-ins along the way.",
  },
  {
    title: "Launch & support",
    text: "We take your product live, monitor how it performs and keep improving it.",
  },
];

const reasons = [
  {
    title: "Talent from our own ecosystem",
    text: "Our team is drawn from the designers and engineers trained through Grazac Academy and Talent City.",
  },
  {
    title: "We understand startups",
    text: "Supporting founders at the Grazac Innovation Lab means we build with your growth in mind.",
  },
  {
    title: "Close collaboration",
    text: "You work directly with the team building your product and see progress at every stage.",
  },
  {
    title: "Built to last",
    text: "Clean, maintainable code and a proper handover, so your product keeps working after launch.",
  },
];

const formOptions = [...services.map((service) => service.title), "Something else"];

// Shown only while developing locally, so empty Sanity sections are easy to spot.
const DevHint = ({ children }) =>
  process.env.NODE_ENV === "development" ? <div className="gz-dev-hint">{children}</div> : null;

const Build = () => {
  const [enquiry, setEnquiry] = useState({ open: false, topic: "" });
  const openForm = useCallback((topic = "") => setEnquiry({ open: true, topic }), []);
  const closeForm = useCallback(() => setEnquiry((prev) => ({ ...prev, open: false })), []);
  const { status, data } = useSanity(BUILD_QUERY);
  const clients = (status === "ready" && data && data.clients) || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="gz">
      <Helmet>
        <title>Grazac Build - Grazac</title>
        <meta
          name="description"
          content="Grazac Build designs and builds websites, mobile apps and startup MVPs for businesses, from idea to launch."
        />
        <meta name="theme-color" content="#773DD3" />
        <meta property="og:title" content="Grazac Build" />
        <meta
          property="og:description"
          content="Making digital solutions a seamless part of everyday life."
        />
        <meta property="og:url" content="https://www.grazac.com.ng/build" />
      </Helmet>

      {enquiry.open && (
        <EnquiryForm
          key={enquiry.topic}
          open
          variant="build"
          topic={enquiry.topic}
          options={formOptions}
          onClose={closeForm}
        />
      )}

      {/* Hero */}
      <section className="gz-build-hero">
        <div className="gz-container gz-build-hero__inner">
          <span className="gz-eyebrow gz-eyebrow--dark">Grazac Build</span>
          <h1>
            Building digital solutions
            <span>for your business needs</span>
          </h1>
          <p>
            From websites and mobile apps to startup MVPs and team training, our team turns your ideas
            into reliable digital products and supports you long after launch.
          </p>
          <div className="gz-actions">
            <button type="button" className="gz-btn gz-btn--light" onClick={() => openForm()}>
              Start your project <FiArrowRight />
            </button>
            <a href="#process" className="gz-btn gz-btn--outline-light">
              How we work
            </a>
          </div>
        </div>
        <span className="gz-float-tag gz-float-tag--dev" aria-hidden="true">
          <FiCode /> Developers
        </span>
        <span className="gz-float-tag gz-float-tag--design" aria-hidden="true">
          <FiMousePointer className="gz-float-tag__cursor" /> Designers
        </span>
      </section>

      {/* Process */}
      <section className="gz-section" id="process">
        <div className="gz-container">
          <div className="gz-section-head gz-section-head--center">
            {/* <span className="gz-eyebrow">Our process</span> */}
            <h2 className="gz-h2">From idea to launch, step by step</h2>
          </div>
          <ol className="gz-timeline gz-timeline--four">
            {steps.map((step, index) => (
              <li
                className="gz-step"
                key={step.title}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-once="true"
              >
                <span className="gz-step__dot">{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Services */}
      <section className="gz-section gz-dark gz-services-dark">
        <div className="gz-container">
          <div className="gz-section-head">
            {/* <span className="gz-eyebrow gz-eyebrow--dark">What we build</span> */}
            <h2 className="gz-h2">Explore our services</h2>
            <p className="gz-lead">
              Whether you're launching something new or improving what you have, we bring the
              design, engineering and training to get it done.
            </p>
          </div>
          <div className="gz-services-dark__grid">
            {services.map((service, index) => (
              <article
                className="gz-service-dark"
                key={service.title}
                data-aos="fade-up"
                data-aos-delay={index * 80}
                data-aos-once="true"
              >
                <span className="gz-service-dark__icon">{service.icon}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <button
                  type="button"
                  className="gz-service-dark__link"
                  onClick={() => openForm(service.title)}
                >
                  Get started <FiArrowRight />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Client logos */}
      {(clients.length > 0 || status !== "loading") && (
        <section className="gz-section gz-clients">
          <div className="gz-container">
            {clients.length > 0 ? (
              <>
                <div className="gz-section-head gz-section-head--center">
                  <span className="gz-eyebrow">Our clients</span>
                  <h2 className="gz-h2">Innovative products our clients have built</h2>
                  <p className="gz-lead">We build for startups and businesses in diverse industries.</p>
                </div>
                <ul className="gz-logos">
                  {clients.map((client) => {
                    const logo = imageUrl(client.logo, 320);
                    const img = logo && <img src={logo} alt={client.name} loading="lazy" />;
                    return (
                      <li key={client._id}>
                        {client.website ? (
                          <a href={client.website} target="_blank" rel="noreferrer">
                            {img}
                          </a>
                        ) : (
                          img
                        )}
                      </li>
                    );
                  })}
                </ul>
              </>
            ) : (
              <DevHint>
                <strong>Client logos section is hidden.</strong> Add clients in the Studio
                (localhost:3000/studio → Build client) and they'll appear here.
              </DevHint>
            )}
          </div>
        </section>
      )}

      {/* Why Grazac */}
      {/* <section className="gz-section gz-section--tint">
        <div className="gz-container gz-split">
          <div className="gz-split__media" data-aos="fade-right" data-aos-once="true">
            <img src={teamImg} alt="Two Grazacians building a product together" loading="lazy" />
          </div>
          <div className="gz-split__copy">
            <span className="gz-eyebrow">Why Grazac Build</span>
            <h2 className="gz-h2">Backed by the whole Grazac ecosystem</h2>
            <ul className="gz-checklist">
              {reasons.map((reason) => (
                <li key={reason.title}>
                  <span className="gz-checklist__icon">
                    <FiCheck />
                  </span>
                  <span>
                    {reason.title}
                    <small>{reason.text}</small>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section> */}

      {/* CTA */}
      <section className="gz-section">
        <div className="gz-container">
          <div className="gz-banner" data-aos="fade-up" data-aos-once="true">
            <div>
              <h2 className="gz-h2">Have an idea? Let's build it together.</h2>
              <p>Tell us about your project and we'll get back to you to discuss the next steps.</p>
            </div>
            <div className="gz-actions">
              <button type="button" className="gz-btn gz-btn--light" onClick={() => openForm()}>
                Start your project <FiArrowRight />
              </button>
              <Link to="/contact" className="gz-btn gz-btn--outline-light">
                Talk to us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Build;
