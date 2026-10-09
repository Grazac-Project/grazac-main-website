import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Blog content lives in Sanity (see /studio). Set these in .env and on Vercel.
const projectId = process.env.REACT_APP_SANITY_PROJECT_ID;
const dataset = process.env.REACT_APP_SANITY_DATASET || "production";

export const sanityConfigured = Boolean(projectId);

// Read-only, public client. Never add a write token here: this code ships to browsers.
export const client = sanityConfigured
  ? createClient({ projectId, dataset, apiVersion: "2024-05-01", useCdn: true })
  : null;

const builder = sanityConfigured ? imageUrlBuilder({ projectId, dataset }) : null;

// Resized, cropped (respecting the editor's hotspot) and auto-formatted image URL.
export const imageUrl = (source, width, height) => {
  if (!builder || !source || !source.asset) return null;
  let image = builder.image(source).width(width).auto("format").quality(80);
  if (height) image = image.height(height).fit("crop");
  return image.url();
};

const CARD_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  featured,
  mainImage,
  "category": category->{ title, "slug": slug.current },
  "author": author->{ name, role, image },
  "readingTime": round(length(pt::text(body)) / 5 / 200)
`;

const PUBLISHED = `_type == "post" && defined(slug.current) && publishedAt <= now()`;

export const POSTS_QUERY = `*[${PUBLISHED}] | order(publishedAt desc) { ${CARD_FIELDS} }`;

export const LATEST_POSTS_QUERY = `*[${PUBLISHED}] | order(publishedAt desc)[0...$limit] { ${CARD_FIELDS} }`;

export const POST_QUERY = `*[${PUBLISHED} && slug.current == $slug][0] {
  ${CARD_FIELDS},
  body,
  "related": *[${PUBLISHED} && category._ref == ^.category._ref && _id != ^._id]
    | order(publishedAt desc)[0...3] { ${CARD_FIELDS} }
}`;

export const formatDate = (value) => {
  const date = new Date(value);
  return isNaN(date)
    ? ""
    : date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
};

export const readingTimeLabel = (minutes) => `${Math.max(1, minutes || 1)} min read`;

// Grazac Build (/build): client logos, managed in the Studio.
export const BUILD_QUERY = `{
  "clients": *[_type == "client" && defined(logo.asset)]
    | order(coalesce(order, 9999) asc, name asc) { _id, name, logo, website }
}`;
