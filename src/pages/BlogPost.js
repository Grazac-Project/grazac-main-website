// @ts-nocheck
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { PortableText } from "@portabletext/react";
import { FiArrowLeft, FiArrowRight, FiCheck, FiLink, FiRefreshCw } from "react-icons/fi";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import useSanity from "../lib/useSanity";
import { POST_QUERY, formatDate, imageUrl, readingTimeLabel } from "../lib/sanity";
import { PostCard } from "../components/blog/PostCard";
import NotFound from "./NotFound";
import "../styles/pages.css";

const SITE_URL = "https://www.grazac.com.ng";

// How each part of the Sanity rich text renders in Grazac's style.
const portableComponents = {
  types: {
    image: ({ value }) => {
      const src = imageUrl(value, 1400);
      if (!src) return null;
      return (
        <figure className="gz-prose__figure">
          <img src={src} alt={value.alt || ""} loading="lazy" />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      );
    },
  },
  marks: {
    link: ({ value, children }) => {
      const href = (value && value.href) || "#";
      const internal = href.startsWith("/");
      if (internal) return <Link to={href}>{children}</Link>;
      return (
        <a
          href={href}
          target={value && value.openInNewTab === false ? undefined : "_blank"}
          rel="noreferrer noopener"
        >
          {children}
        </a>
      );
    },
  },
};

const ShareLinks = ({ url, title }) => {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setCopied(false);
    }
  };

  const links = [
    { label: "Share on X", icon: <FaXTwitter />, href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` },
    { label: "Share on LinkedIn", icon: <FaLinkedinIn />, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { label: "Share on WhatsApp", icon: <FaWhatsapp />, href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}` },
    { label: "Share on Facebook", icon: <FaFacebookF />, href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
  ];

  return (
    <div className="gz-share">
      <span>Share this article</span>
      <div className="gz-share__links">
        {links.map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label}>
            {link.icon}
          </a>
        ))}
        <button type="button" onClick={copy} aria-label="Copy link">
          {copied ? <FiCheck /> : <FiLink />}
        </button>
      </div>
      <span className="gz-share__status" aria-live="polite">
        {copied ? "Link copied!" : ""}
      </span>
    </div>
  );
};

const BlogPost = () => {
  const { slug } = useParams();
  const { status, data: post, retry } = useSanity(POST_QUERY, { slug });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (status === "ready" && !post) return <NotFound />;

  if (status === "unconfigured" || status === "error") {
    return (
      <div className="gz">
        <section className="gz-hero gz-404">
          <div className="gz-container gz-404__inner">
            <h1 className="gz-h2">
              {status === "error" ? "We couldn't load this article" : "Our blog is coming soon"}
            </h1>
            <p className="gz-lead">
              {status === "error"
                ? "Please check your connection and try again."
                : "Check back shortly for stories from the Grazac community."}
            </p>
            <div className="gz-actions">
              {status === "error" && (
                <button type="button" className="gz-btn gz-btn--primary" onClick={retry}>
                  <FiRefreshCw /> Try again
                </button>
              )}
              <Link to="/blog" className="gz-btn gz-btn--ghost">
                Back to blog
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (status === "loading" || !post) {
    return (
      <div className="gz">
        <article className="gz-article" aria-busy="true">
          <div className="gz-article__head">
            <div className="gz-skel gz-skel--short" />
            <div className="gz-skel gz-skel--title" />
            <div className="gz-skel" />
          </div>
          <div className="gz-article__cover gz-skel" />
        </article>
      </div>
    );
  }

  const url = `${SITE_URL}/blog/${post.slug}`;
  const cover = imageUrl(post.mainImage, 1600, 900);
  const ogImage = imageUrl(post.mainImage, 1200, 630);
  const avatar = post.author && imageUrl(post.author.image, 96, 96);

  return (
    <div className="gz">
      <Helmet>
        <title>{`${post.title} - Grazac Blog`}</title>
        {post.excerpt && <meta name="description" content={post.excerpt} />}
        <meta name="theme-color" content="#773DD3" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        {post.excerpt && <meta property="og:description" content={post.excerpt} />}
        {ogImage && <meta property="og:image" content={ogImage} />}
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <link rel="canonical" href={url} />
      </Helmet>

      <article className="gz-article">
        <header className="gz-article__head">
          <Link to="/blog" className="gz-article__back">
            <FiArrowLeft /> Back to blog
          </Link>
          {post.category && <span className="gz-eyebrow">{post.category.title}</span>}
          <h1>{post.title}</h1>
          {post.excerpt && <p className="gz-article__excerpt">{post.excerpt}</p>}
          <div className="gz-article__byline">
            {avatar ? (
              <img src={avatar} alt="" className="gz-article__avatar" />
            ) : (
              <span className="gz-article__avatar gz-article__avatar--initial" aria-hidden="true">
                {(post.author && post.author.name ? post.author.name : "G").charAt(0)}
              </span>
            )}
            <div>
              <strong>{post.author ? post.author.name : "Grazac Team"}</strong>
              {post.author && post.author.role && <span>{post.author.role}</span>}
              <span>
                {formatDate(post.publishedAt)} · {readingTimeLabel(post.readingTime)}
              </span>
            </div>
          </div>
        </header>

        {cover && (
          <figure className="gz-article__cover">
            <img src={cover} alt={(post.mainImage && post.mainImage.alt) || ""} />
          </figure>
        )}

        <div className="gz-prose">
          <PortableText value={post.body || []} components={portableComponents} />
        </div>

        <footer className="gz-article__foot">
          <ShareLinks url={url} title={post.title} />
        </footer>
      </article>

      {post.related && post.related.length > 0 && (
        <section className="gz-section gz-section--tint">
          <div className="gz-container">
            <div className="gz-section-head gz-section-head--row">
              <div>
                <h2 className="gz-h2">Keep reading</h2>
              </div>
              <Link to="/blog" className="gz-btn gz-btn--ghost">
                All stories <FiArrowRight />
              </Link>
            </div>
            <div className="gz-blog">
              {post.related.map((item) => (
                <PostCard key={item._id} post={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPost;
