import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { formatDate, imageUrl } from "../../lib/sanity";

export const PostCard = ({ post }) => {
  const image = imageUrl(post.mainImage, 720, 450);
  return (
    <Link to={`/blog/${post.slug}`} className="gz-post">
      <div className="gz-post__img">
        {image && (
          <img src={image} alt={(post.mainImage && post.mainImage.alt) || ""} loading="lazy" />
        )}
      </div>
      <div className="gz-post__body">
        <p className="gz-post__meta">
          {post.category && <span className="gz-post__cat">{post.category.title}</span>}
          <span>{formatDate(post.publishedAt)}</span>
        </p>
        <h3 className="gz-post__title">{post.title}</h3>
        {post.excerpt && <p className="gz-post__excerpt">{post.excerpt}</p>}
        <span className="gz-post__more">
          Read more <FiArrowRight />
        </span>
      </div>
    </Link>
  );
};

export const PostCardSkeleton = () => (
  <div className="gz-post gz-post--skeleton" aria-hidden="true">
    <div className="gz-post__img" />
    <div className="gz-post__body">
      <div className="gz-skel gz-skel--short" />
      <div className="gz-skel" />
      <div className="gz-skel" />
    </div>
  </div>
);
