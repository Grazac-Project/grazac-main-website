import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiYoutube,
} from "react-icons/fi";
import "../styles/pages.css";

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Innovation Lab", to: "/startup" },
      { label: "Co-working Space", to: "/workspace" },
      { label: "Membership Plans", to: "/coworking-spaces" },
      { label: "Book a Space", to: "/bookSpace" },
      { label: "Grazac Academy", href: "https://www.grazacacademy.com" },
      { label: "Grazac Talent City", href: "https://www.grazactalentcity.com" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Blog", to: "/blog" },
      { label: "Careers", href: "https://grazac.breezy.hr/" },
      { label: "Contact Us", to: "/contact" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Apply to the Lab", to: "/apply" },
      { label: "Become a Mentor", to: "/contact" },
      { label: "Ogun Digital Summit", href: "https://www.ogundigitalsummit.com/" },
    ],
  },
];

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/grazacng", icon: <FiFacebook /> },
  { label: "Twitter", href: "https://twitter.com/grazacacademy", icon: <FiTwitter /> },
  { label: "Instagram", href: "https://www.instagram.com/grazacacademy/", icon: <FiInstagram /> },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCAQ_Q8wYZloETgrdlBbwMtg",
    icon: <FiYoutube />,
  },
];

const FooterLink = ({ link }) =>
  link.href ? (
    <a href={link.href} target="_blank" rel="noreferrer">
      {link.label}
    </a>
  ) : (
    <Link to={link.to}>{link.label}</Link>
  );

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email.trim()) {
      setStatus({ type: "error", text: "Please enter your email address." });
      return;
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      setStatus({ type: "error", text: "Please enter a valid email address." });
      return;
    }

    setLoading(true);
    setStatus({ type: "", text: "" });
    try {
      const res = await axios.post(
        "https://grazac-academy-back-end-ej7s.onrender.com/api/v1/user/subscribe",
        { email: email.trim() },
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.status === 201) {
        setStatus({ type: "success", text: "You're in! Look out for our next update." });
        setEmail("");
      } else {
        setStatus({ type: "error", text: res.data.message || "Subscription failed." });
      }
    } catch (err) {
      setStatus({
        type: "error",
        text:
          err.response && err.response.status === 400
            ? "This email is already subscribed."
            : "Subscription failed. Please try again.",
      });
    }
    setLoading(false);
  };

  return (
    <div className="gz-newsletter">
      <h2>Join our community</h2>
      <p>Get weekly updates and ideas on tech from the Grazac team, straight to your inbox.</p>
      <form className="gz-newsletter__form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="footer-email" className="gz-sr-only">
          Email address
        </label>
        <input
          id="footer-email"
          type="email"
          placeholder="jane@email.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={status.type === "error"}
          aria-describedby="footer-email-status"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Subscribing…" : "Subscribe"}
        </button>
      </form>
      <p
        id="footer-email-status"
        className={`gz-newsletter__note ${status.type ? `is-${status.type}` : ""}`}
        aria-live="polite"
      >
        {status.text || "We'll never share your email or spam you."}
      </p>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="gz-footer">
      <div className="gz-footer__container">
        <Newsletter />

        <div className="gz-footer__grid">
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3>{column.title}</h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink link={link} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="gz-footer__visit">
            <h3>
              Visit us <FiArrowUpRight />
            </h3>
            <a
              href="https://www.google.com/maps/search/?api=1&query=PROHUB+Salawu+Olabode+Avenue+Ewang+Road+Idi-aba+Abeokuta"
              target="_blank"
              rel="noreferrer"
            >
              PROHUB, Salawu Olabode Avenue, Ewang Road, Idi-aba, Abeokuta
            </a>
            <a href="tel:+2348068365951">+234 806 836 5951</a>
            <Link to="/contact" className="gz-footer__cta">
              Get in touch <FiArrowRight />
            </Link>
          </div>
        </div>

        <div className="gz-footer__bottom">
          <div className="gz-footer__socials">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
          <p>© {new Date().getFullYear()} Grazac Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
