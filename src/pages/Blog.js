// @ts-nocheck
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FiArrowRight, FiRefreshCw } from "react-icons/fi";
import useSanity from "../lib/useSanity";
import { POSTS_QUERY, formatDate, imageUrl, readingTimeLabel } from "../lib/sanity";
import { PostCard, PostCardSkeleton } from "../components/blog/PostCard";
import "../styles/pages.css";

const PAGE_SIZE = 9;

const FeaturedPost = ({ post }) => {
  const image = imageUrl(post.mainImage, 1200, 800);
  return (
    <Link to={`/blog/${post.slug}`} className="gz-featured" data-aos="fade-up" data-aos-once="true">
      <div className="gz-featured__img">
        {image && <img src={image} alt={(post.mainImage && post.mainImage.alt) || ""} />}
      </div>
      <div className="gz-featured__body">
        <p className="gz-post__meta">
          {post.category && <span className="gz-post__cat">{post.category.title}</span>}
          <span>{formatDate(post.publishedAt)}</span>
          <span>{readingTimeLabel(post.readingTime)}</span>
        </p>
        <h2>{post.title}</h2>
        {post.excerpt && <p className="gz-featured__excerpt">{post.excerpt}</p>}
        <span className="gz-btn gz-btn--primary gz-featured__cta">
          Read article <FiArrowRight />
        </span>
      </div>
    </Link>
  );
};

const BlogMessage = ({ title, text, action }) => (
  <div className="gz-blog-message">
    <h2>{title}</h2>
    <p>{text}</p>
    {action}
  </div>
);

const Blog = () => {
  const { status, data, retry } = useSanity(POSTS_QUERY);
  const [category, setCategory] = useState("all");
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const posts = useMemo(() => data || [], [data]);
  const featured = posts.find((post) => post.featured) || posts[0];

  const categories = useMemo(() => {
    const seen = new Map();
    posts.forEach((post) => post.category && seen.set(post.category.slug, post.category.title));
    return [...seen.entries()].map(([slug, title]) => ({ slug, title }));
  }, [posts]);

  const filtered = useMemo(() => {
    if (category === "all") return posts.filter((post) => post !== featured);
    return posts.filter((post) => post.category && post.category.slug === category);
  }, [posts, category, featured]);

  const chooseCategory = (slug) => {
    setCategory(slug);
    setVisible(PAGE_SIZE);
  };

  return (
    <div className="gz">
      <Helmet>
        <title>Blog - Grazac</title>
        <meta
          name="description"
          content="Stories, insights and updates from the Grazac ecosystem: startups, tech talent, learning and the future of work in Africa."
        />
        <meta name="theme-color" content="#773DD3" />
        <meta property="og:title" content="Grazac Blog"></meta>
        <meta
          property="og:description"
          content="Stories, insights and updates from the Grazac ecosystem."
        ></meta>
        <meta property="og:url" content="https://www.grazac.com.ng/blog" />
      </Helmet>

      {/* Intro */}
      <section className="gz-hero gz-blog-hero">
        <div className="gz-container gz-blog-hero__inner">
          <span className="gz-eyebrow">Grazac Blog</span>
          <h1 className="gz-display">
            Stories from the <span className="gz-accent">Grazac ecosystem.</span>
          </h1>
          <p className="gz-lead">
            Insights on startups, tech talent, learning and the future of work in Africa, straight
            from the Grazac team and community.
          </p>
        </div>
      </section>

      <section className="gz-section gz-blog-page">
        <div className="gz-container">
          {status === "unconfigured" && (
            <BlogMessage
              title="Our blog is coming soon"
              text="We're setting things up. Check back shortly for stories from the Grazac community."
            />
          )}

          {status === "error" && (
            <BlogMessage
              title="We couldn't load the blog"
              text="Please check your connection and try again."
              action={
                <button type="button" className="gz-btn gz-btn--primary" onClick={retry}>
                  <FiRefreshCw /> Try again
                </button>
              }
            />
          )}

          {status === "loading" && (
            <>
              <div className="gz-featured gz-featured--skeleton" aria-hidden="true">
                <div className="gz-featured__img gz-skel" />
                <div className="gz-featured__body">
                  <div className="gz-skel gz-skel--short" />
                  <div className="gz-skel" />
                  <div className="gz-skel" />
                </div>
              </div>
              <div className="gz-blog" aria-busy="true">
                {[0, 1, 2].map((key) => (
                  <PostCardSkeleton key={key} />
                ))}
              </div>
            </>
          )}

          {status === "ready" && posts.length === 0 && (
            <BlogMessage
              title="No stories yet"
              text="We're working on our first posts. Check back soon."
            />
          )}

          {status === "ready" && posts.length > 0 && (
            <>
              {category === "all" && featured && (
                <>
                  <p className="gz-blog-label">Featured</p>
                  <FeaturedPost post={featured} />
                </>
              )}

              <div className="gz-blog-toolbar">
                <h2 className="gz-h3">{category === "all" ? "More to explore" : "Stories"}</h2>
                {categories.length > 1 && (
                  <div className="gz-chips" role="group" aria-label="Filter by category">
                    {[{ slug: "all", title: "All" }, ...categories].map((item) => (
                      <button
                        type="button"
                        key={item.slug}
                        className={`gz-chip-btn ${category === item.slug ? "is-active" : ""}`}
                        aria-pressed={category === item.slug}
                        onClick={() => chooseCategory(item.slug)}
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {filtered.length === 0 ? (
                <p className="gz-body">More stories coming soon.</p>
              ) : (
                <div className="gz-blog">
                  {filtered.slice(0, visible).map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </div>
              )}

              {filtered.length > visible && (
                <div className="gz-blog-more">
                  <button
                    type="button"
                    className="gz-btn gz-btn--ghost"
                    onClick={() => setVisible((count) => count + PAGE_SIZE)}
                  >
                    Load more stories
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
