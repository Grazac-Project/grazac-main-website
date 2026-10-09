// @ts-nocheck
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FiArrowRight } from "react-icons/fi";
import "../styles/pages.css";

const shortcuts = [
  { label: "About us", to: "/about" },
  { label: "Startups", to: "/startup" },
  { label: "Co-working space", to: "/workspace" },
  { label: "Blog", to: "/blog" },
];

const NotFound = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="gz">
      <Helmet>
        <title>Page Not Found - Grazac</title>
        <meta name="robots" content="noindex" />
        <meta name="theme-color" content="#773DD3" />
      </Helmet>
      <section className="gz-hero gz-404">
        <div className="gz-container gz-404__inner">
          <p className="gz-404__code" aria-hidden="true">
            404
          </p>
          <span className="gz-eyebrow">Error 404</span>
          <h1 className="gz-h2">Page not found</h1>
          <p className="gz-lead">
            The page you're looking for doesn't exist or may have been moved. Let's get you back on
            track.
          </p>
          <div className="gz-actions">
            <Link to="/" className="gz-pill">
              <span className="gz-pill__dot" aria-hidden="true">
                <FiArrowRight />
              </span>
              Go home
            </Link>
            <Link to="/contact" className="gz-btn gz-btn--ghost">
              Contact us
            </Link>
          </div>
          <nav className="gz-404__links" aria-label="Popular pages">
            <span>Popular pages:</span>
            {shortcuts.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
