// @ts-nocheck

import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Loader from "../components/Loader";
import Scroll from "../components/Scroll";
import Subscribe from "../components/subscribe";

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@grazac"
      )
      .then((res) => {
        setBlogs(res.data.items);
      });
  }, []);
  return (
    <div className="">
      <Helmet>
        <title>Blog - Grazac</title>
        <meta name="description" content=" Welcome to Grazac Blog" />
        <meta name="theme-color" content="#773DD3" />
        <meta property="og:description" content="Welcome to Grazac Blog"></meta>
        <meta property="og:title" content="GRAZAC TECHNOLOGIES"></meta>
        <meta name="twitter:title" content="GRAZAC TECHNOLOGIES"></meta>
        <meta property="og:url" content="https://www.grazac.com.ng/blog" />
      </Helmet>
      <div className="blogs">
        <div className="blogs__welcome">
          <div className="blogs__container">
            <div className="blogs__intro">
              <span>Welcome to</span>
              <span>grazac blog</span>
            </div>
            {/* <ul className="blogs__list">
              <li className="blogs__item">Use cases</li>
              <li className="blogs__item">Culture</li>
              <li className="blogs__item">Updates</li>
              <li className="blogs__item">Customer Experience</li>
              <li className="blogs__item">Support</li>
              <li className="blogs__item">Design</li>
              <li className="blogs__item">Marketing</li>
            </ul> */}
            {blogs.length > 0 ? (
              <a
                className="blogs__hero"
                href={blogs[0].link}
                target="_blank"
                rel="noreferrer"
              >
                <div className="blogs__hero-container">
                  <>
                    <div className="blogs__hero-img">
                      {/* {blogs[0].thumbnail && <img src={blogs[0].thumbnail} alt="breath" />} */}
                      {blogs[0].description.toString().match(/<img[^>]+src="([^">]+)"/)[1] && <img src={blogs[0].description.toString().match(/<img[^>]+src="([^">]+)"/)[1]} alt="breath" />}
                    </div>
                    <div className="blogs__hero-content">
                      {/* <h6 className="blogtitle">Startups</h6> */}
                      <h4>{blogs[0].title}</h4>
                      <p>
                        {blogs[0].description
                          .replace(/(<([^>]+)>)/gi, "")
                          .substring(0, 450)}
                        ...
                      </p>
                      <small className="small">{blogs[0].pubDate}</small>
                    </div>
                  </>
                </div>
              </a>
            ) : null}
          </div>
        </div>
        {blogs.length < 1 ? (
          <div className="blogs__loader">
            <Loader />
          </div>
        ) : (
          <div className="blogs__blog">
            <div className="blogs__blog-box">
              <div className="blogs__blog-container">
                {blogs.map((blog, index) => {
                  return (
                    <a
                      href={blog.link}
                      className="blog"
                      target="_blank"
                      rel="noreferrer"
                      key={index}
                    >
                      {blog.description.toString().match(/<img[^>]+src="([^">]+)"/)[1] && <div className="blog__img">
                        <img src={blog.description.toString().match(/<img[^>]+src="([^">]+)"/)[1]} alt="img" />
                      </div>}
                      <div className="blog__content">
                        <div className="blog__content-container">
                          {/* <h6 className="blogtitle">press release</h6> */}
                          <h3 className="muted muted-1">{blog.title}</h3>

                          <small className="small">{blog.pubDate}</small>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="blogs__subscribe">
        <Subscribe />
      </div>
      <Scroll />
    </div>
  );
};

export default Blog;
