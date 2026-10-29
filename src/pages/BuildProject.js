// @ts-nocheck
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiRefreshCw } from "react-icons/fi";
import EnquiryForm from "../components/EnquiryForm";
import { CountUp, DeviceScreen, ScrollStory, textOn, useParallax } from "../components/caseStudy";
import useSanity from "../lib/useSanity";
import { PROJECT_QUERY, imageUrl } from "../lib/sanity";
import { formOptions } from "./Build";
import NotFound from "./NotFound";
import "../styles/pages.css";

const SITE_URL = "https://www.grazac.com.ng";

const hasAsset = (image) => Boolean(image && image.asset);

// Studio tag fields can carry stray spaces or empty entries.
const cleanTags = (tags) => (tags || []).map((tag) => (tag || "").trim()).filter(Boolean);

// Studio text fields use a blank line between paragraphs.
const toParagraphs = (text) =>
  (text || "")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

// Shown only while developing locally, so empty case study sections are easy to spot.
const DevHint = ({ children }) =>
  process.env.NODE_ENV === "development" ? <div className="gz-dev-hint">{children}</div> : null;

// Highlights the client's name inside the headline, e.g. "Revolutionizing Savings with *Jollof+*".
const Headline = ({ text, name }) => {
  const index = name ? text.toLowerCase().indexOf(name.toLowerCase()) : -1;
  if (index === -1) return text;
  return (
    <>
      {text.slice(0, index)}
      <span className="gz-case-mark">{text.slice(index, index + name.length)}</span>
      {text.slice(index + name.length)}
    </>
  );
};

// Feature highlights tile in this repeating pattern of widths (out of 6 columns).
const BENTO_SPANS = [4, 2, 2, 4, 3, 3];

const BuildProject = () => {
  const { slug } = useParams();
  const { status, data: project, retry } = useSanity(PROJECT_QUERY, { slug });
  const [formOpen, setFormOpen] = useState(false);
  const openForm = useCallback(() => setFormOpen(true), []);
  const closeForm = useCallback(() => setFormOpen(false), []);
  const heroRef = useRef(null);
  useParallax(heroRef, status === "ready" && Boolean(project));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (status === "ready" && !project) return <NotFound />;

  if (status === "unconfigured" || status === "error") {
    return (
      <div className="gz">
        <section className="gz-hero gz-404">
          <div className="gz-container gz-404__inner">
            <h1 className="gz-h2">We couldn't load this project</h1>
            <p className="gz-lead">Please check your connection and try again.</p>
            <div className="gz-actions">
              {status === "error" && (
                <button type="button" className="gz-btn gz-btn--primary" onClick={retry}>
                  <FiRefreshCw /> Try again
                </button>
              )}
              <Link to="/build" className="gz-btn gz-btn--ghost">
                Back to Grazac Build
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (status === "loading" || !project) {
    return (
      <div className="gz gz-case">
        <section className="gz-case-hero" ref={heroRef} aria-busy="true">
          <div className="gz-container gz-case-hero__copy">
            <div className="gz-skel gz-skel--title" />
            <div className="gz-skel" />
          </div>
        </section>
      </div>
    );
  }

  const headline =
    project.headline || (project.tagline ? `${project.name} - ${project.tagline}` : project.name);
  const services = cleanTags(project.services);
  const deliverables = cleanTags(project.deliverables);
  const stack = cleanTags(project.stack);
  const results = (project.results || []).filter((result) => result && result.value);
  const steps = (project.steps || []).filter((step) => step && step.title && hasAsset(step.screen));
  const highlights = (project.highlights || []).filter((item) => item && item.title && hasAsset(item.image));
  const desktopScreens = (project.desktopScreens || []).filter(hasAsset);
  const mobileScreens = (project.mobileScreens || []).filter(hasAsset);
  const slides = (project.slides || []).filter(hasAsset);
  const cover = hasAsset(project.coverImage) ? project.coverImage : null;
  const [overviewLead, ...overviewRest] = toParagraphs(project.overview);
  const [challengeLead, ...challengeRest] = toParagraphs(project.challenge);
  const solution = toParagraphs(project.solution);

  // Hero composition: the first desktop screen (or the cover) with the first phone screen in front.
  const heroDesktop = desktopScreens[0] || cover;
  const heroMobile = mobileScreens[0];

  const glance = [
    { label: "Client", value: project.name },
    services.length > 0 && { label: "Services", value: services.join(", ") },
    project.platforms && { label: "Platforms", value: project.platforms },
    deliverables.length > 0 && { label: "Deliverables", value: deliverables.join(", ") },
    stack.length > 0 && { label: "Stack", value: stack.join(", ") },
  ].filter(Boolean);

  const projects = project.projects || [];
  const position = projects.findIndex((item) => item.slug === project.slug);
  const next = projects.length > 1 ? projects[(position + 1) % projects.length] : null;
  const nextCover = next && imageUrl(next.coverImage, 1400);
  const nextLogo = next && !nextCover && imageUrl(next.logo, 600);
  const nextBrand = (next && next.brandColor) || "#1f1035";

  const missing = [
    !project.headline && !project.summary && "Headline and summary (Case study: hero)",
    !heroMobile && !desktopScreens.length && "Desktop and mobile screens for the hero (Case study: screens)",
    !project.overview && "Overview (Case study: story)",
    !project.challenge && "The challenge (Case study: story)",
    !project.solution && "Our solution (Case study: story)",
    steps.length === 0 && "How we built it (Case study: story)",
    highlights.length === 0 && "Feature highlights (Case study: story)",
    results.length === 0 && "Results (Case study: story)",
  ].filter(Boolean);

  const description = project.summary || `${project.name}, built by Grazac Build.`;
  const url = `${SITE_URL}/build/${project.slug}`;
  const ogImage = imageUrl(project.coverImage, 1200, 630);
  // The client's colour drives the page; Grazac purple when not set.
  const brand = project.brandColor || "#773dd3";
  const brandInk = textOn(brand);
  // On white, light brand colours (e.g. yellow) fall back to ink so labels stay readable.
  const theme = { "--gz-case": brand, "--gz-case-ink": brandInk, "--gz-case-text": brandInk === "#ffffff" ? brand : "#1f1035" };

  return (
    <div className="gz gz-case" style={theme}>
      <Helmet>
        <title>{`${project.name} Case Study - Grazac Build`}</title>
        <meta name="description" content={description} />
        <meta name="theme-color" content={brand} />
        <meta property="og:title" content={headline} />
        <meta property="og:description" content={description} />
        {ogImage && <meta property="og:image" content={ogImage} />}
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={headline} />
        <link rel="canonical" href={url} />
      </Helmet>

      {formOpen && (
        <EnquiryForm open variant="build" options={formOptions} onClose={closeForm} />
      )}

      {/* Hero: big headline, then the product in a browser and phone */}
      <section
        className={`gz-case-hero${heroDesktop || heroMobile ? " gz-case-hero--devices" : ""}`}
        ref={heroRef}
      >
        <div className="gz-case-hero__glow" aria-hidden="true" />
        <div className="gz-container gz-case-hero__copy">
          <Link to="/build" className="gz-case-hero__back">
            <FiArrowLeft /> Back to Grazac Build
          </Link>
          {services.length > 0 && <span className="gz-case-hero__tag">{services.join(" · ")}</span>}
          <h1>
            <Headline text={headline} name={project.name} />
          </h1>
          {project.summary && <p className="gz-case-hero__summary">{project.summary}</p>}
          <div className="gz-actions">
            <button type="button" className="gz-btn gz-case-btn" onClick={openForm}>
              Start your project <FiArrowRight />
            </button>
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noreferrer"
                className="gz-btn gz-case-btn gz-case-btn--outline"
              >
                Visit live <FiArrowUpRight />
              </a>
            )}
          </div>
        </div>
        {(heroDesktop || heroMobile) && (
          <div className="gz-container gz-case-hero__devices">
            <div className="gz-case-hero__stage">
              {heroDesktop && (
                <DeviceScreen
                  className="gz-case-hero__desktop"
                  image={heroDesktop}
                  device="desktop"
                  label={`${project.name} website`}
                  eager
                />
              )}
              {heroMobile && (
                <DeviceScreen
                  className="gz-case-hero__mobile"
                  image={heroMobile}
                  device="mobile"
                  label={`${project.name} on mobile`}
                  index={1}
                  eager
                />
              )}
            </div>
          </div>
        )}
      </section>

      {/* At a glance */}
      <div className="gz-container">
        <dl className="gz-case-glance">
          {glance.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {missing.length > 0 && (
        <div className="gz-container gz-case-devhint">
          <DevHint>
            <strong>Only visible while developing: these sections are hidden until filled in.</strong> Add them
            for {project.name} in the Studio (localhost:3000/studio → Build client), click Publish, then refresh:
            <ul>
              {missing.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </DevHint>
        </div>
      )}

      {/* Overview: the opening paragraph set large, editorial style */}
      {overviewLead && (
        <section className="gz-section gz-case-intro">
          <div className="gz-container gz-case-intro__grid">
            <span className="gz-case-label">Overview</span>
            <div>
              <p className="gz-case-intro__lead" data-aos="fade-up" data-aos-once="true">
                {overviewLead}
              </p>
              {overviewRest.map((paragraph, index) => (
                <p className="gz-case-intro__more" key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* The challenge, as one big statement */}
      {challengeLead && (
        <section className="gz-section gz-case-challenge">
          <div className="gz-container">
            <span className="gz-case-label">The challenge</span>
            <blockquote className="gz-case-challenge__quote" data-aos="fade-up" data-aos-once="true">
              {challengeLead}
            </blockquote>
            {challengeRest.length > 0 && (
              <div className="gz-case-challenge__more">
                {challengeRest.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Our solution, then "How we built it" told as you scroll */}
      {(solution.length > 0 || steps.length > 0) && (
        <section className="gz-section gz-case-solution">
          <div className="gz-container">
            <div className="gz-case-solution__head">
              <span className="gz-case-label">Our solution</span>
              {solution.length > 0 && (
                <div className="gz-case-solution__text">
                  {solution.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              )}
            </div>
            {steps.length > 0 && <ScrollStory steps={steps} name={project.name} />}
          </div>
        </section>
      )}

      {/* Feature highlights, tiled */}
      {highlights.length > 0 && (
        <section className="gz-section gz-case-bento-wrap">
          <div className="gz-container">
            <div className="gz-case-section-head">
              <span className="gz-case-label">Highlights</span>
              <h2 className="gz-h2">What makes {project.name} work</h2>
            </div>
            <div className="gz-case-bento">
              {highlights.map((item, index) => {
                const hotspot = item.image.hotspot;
                return (
                  <article
                    className="gz-case-bento__tile"
                    key={item._key || index}
                    style={{ "--span": BENTO_SPANS[index % BENTO_SPANS.length] }}
                    data-aos="fade-up"
                    data-aos-delay={(index % 3) * 80}
                    data-aos-once="true"
                  >
                    <div className="gz-case-bento__media">
                      <img
                        src={imageUrl(item.image, 1200)}
                        alt=""
                        loading="lazy"
                        style={
                          hotspot
                            ? { objectPosition: `${hotspot.x * 100}% ${hotspot.y * 100}%` }
                            : undefined
                        }
                      />
                    </div>
                    <div className="gz-case-bento__copy">
                      <h3>{item.title}</h3>
                      {item.text && <p>{item.text}</p>}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Results, counting up */}
      {results.length > 0 && (
        <section className="gz-case-results">
          <div className="gz-container">
            <span className="gz-case-label gz-case-label--light">The impact</span>
            <ul>
              {results.map((result) => (
                <li key={result._key || result.label}>
                  <CountUp value={result.value} />
                  <span>{result.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Every screen */}
      {(desktopScreens.length > 0 || mobileScreens.length > 0) && (
        <section className="gz-section gz-case-screens">
          <div className="gz-container">
            <div className="gz-case-section-head gz-case-section-head--center">
              <span className="gz-case-label">The product</span>
              <h2 className="gz-h2">A closer look at {project.name}</h2>
            </div>
            {desktopScreens.length > 0 && (
              <div className="gz-case-screens__desktop">
                {desktopScreens.map((image, index) => (
                  <DeviceScreen
                    key={image._key}
                    image={image}
                    device="desktop"
                    label={`${project.name} desktop screen ${index + 1}`}
                    caption={image.caption}
                    index={index}
                  />
                ))}
              </div>
            )}
            {mobileScreens.length > 0 && (
              <div className="gz-case-screens__mobile">
                {mobileScreens.map((image, index) => (
                  <DeviceScreen
                    key={image._key}
                    image={image}
                    device="mobile"
                    label={`${project.name} mobile screen ${index + 1}`}
                    caption={image.caption}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Case study slides */}
      {slides.length > 0 && (
        <div className="gz-container gz-case-slides">
          {slides.map((slide, index) => (
            <figure className="gz-case-slide" key={slide._key || index}>
              <img
                src={imageUrl(slide, 1800)}
                alt={slide.alt || `${project.name} case study, slide ${index + 1}`}
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      )}

      {/* CTA */}
      <section className="gz-section gz-case-cta">
        <div className="gz-container">
          <div className="gz-banner">
            <div>
              <h2 className="gz-h2">Let's build the future together</h2>
              <p>Tell us about your idea and we'll help you turn it into a product people love.</p>
            </div>
            <div className="gz-actions">
              <button type="button" className="gz-btn gz-btn--light" onClick={openForm}>
                Start your project <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Next project */}
      {next && (
        <Link
          to={`/build/${next.slug}`}
          className="gz-case-next"
          style={{ "--gz-next": nextBrand, "--gz-next-ink": textOn(nextBrand) }}
        >
          <div className="gz-container gz-case-next__inner">
            <div className="gz-case-next__copy">
              <span className="gz-case-next__label">Next project</span>
              <strong>{next.name}</strong>
              {next.tagline && <em>{next.tagline}</em>}
              <span className="gz-case-next__arrow" aria-hidden="true">
                <FiArrowRight />
              </span>
            </div>
            {(nextCover || nextLogo) && (
              <div className={`gz-case-next__media${nextCover ? "" : " gz-case-next__media--logo"}`}>
                <img src={nextCover || nextLogo} alt="" loading="lazy" />
              </div>
            )}
          </div>
        </Link>
      )}
    </div>
  );
};

export default BuildProject;
