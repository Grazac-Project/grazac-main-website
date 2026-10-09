import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "The post's web address: grazac.com.ng/blog/<slug>. Click Generate.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Summary",
      type: "text",
      rows: 3,
      description: "One or two sentences shown on cards, at the top of the article and in Google results.",
      validation: (rule) => rule.required().max(220),
    }),
    defineField({
      name: "mainImage",
      title: "Cover image",
      type: "image",
      description: "Landscape works best (at least 1600 × 900).",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alternative text",
          type: "string",
          validation: (rule) => rule.required(),
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "author", title: "Author", type: "reference", to: [{ type: "author" }] }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      description: "Posts dated in the future stay hidden until that time.",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Feature this post",
      type: "boolean",
      description: "Shows it large at the top of the blog. If several are ticked, the newest wins.",
      initialValue: false,
    }),
    defineField({ name: "body", title: "Body", type: "blockContent", validation: (rule) => rule.required() }),
  ],
  orderings: [
    { title: "Newest first", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", category: "category.title", featured: "featured", media: "mainImage" },
    prepare: ({ title, category, featured, media }) => ({
      title,
      subtitle: [featured ? "★ Featured" : null, category].filter(Boolean).join(" · "),
      media,
    }),
  },
});
