import { defineArrayMember, defineField, defineType } from "sanity";

// A Grazac Build client, shown as a project card on /build. Cards with a slug
// link to a case study page at /build/<slug>.
export default defineType({
  name: "client",
  title: "Build client",
  type: "document",
  groups: [
    { name: "card", title: "Card", default: true },
    { name: "caseStudy", title: "Case study: hero" },
    { name: "story", title: "Case study: story" },
    { name: "screens", title: "Case study: screens" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "card",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "card",
      description: "The case study's address, e.g. stitchvine → /build/stitchvine. Click Generate from the name.",
      options: { source: "name", maxLength: 96 },
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "card",
      description: "Short line shown after the name, e.g. \"Fashion Made Easy\".",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      group: "card",
      description: "What we did, e.g. Branding & Identity, Websites & Digital Platforms.",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      group: "card",
      description: "Shown on the card and at the top of the case study. Landscape works best (at least 1600 × 1100).",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alternative text", type: "string" }],
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      group: "card",
      description: "A transparent PNG or SVG works best. Shown as the brandmark on the case study.",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "website", title: "Website", type: "url", group: "card" }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      group: "card",
      description: "Lower numbers show first.",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      group: "caseStudy",
      description:
        "Big title at the top of the case study, e.g. \"Revolutionizing Savings with Jollof+\". The client's name is highlighted in the brand colour. Defaults to the name and tagline.",
      validation: (rule) => rule.max(90),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      group: "caseStudy",
      description: "One or two sentences under the headline. Also used in Google results and link previews.",
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: "brandColor",
      title: "Brand colour",
      type: "string",
      group: "caseStudy",
      description: "The client's main colour as a hex code, e.g. #1F5EFF. Used for highlights on the case study. Defaults to Grazac purple.",
      validation: (rule) =>
        rule.regex(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i, { name: "hex colour" }).error("Use a hex code like #1F5EFF."),
    }),
    defineField({
      name: "platforms",
      title: "Platforms",
      type: "string",
      group: "caseStudy",
      description: "e.g. Web, Android and iOS",
    }),
    defineField({
      name: "deliverables",
      title: "Deliverables",
      type: "array",
      group: "caseStudy",
      description: "e.g. Website, Admin dashboard, Mobile app",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "stack",
      title: "Stack / technology used",
      type: "array",
      group: "caseStudy",
      description: "e.g. React, Node.js, PostgreSQL",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "overview",
      title: "Overview",
      type: "text",
      rows: 5,
      group: "story",
      description: "What the product is and who it is for. Leave a blank line between paragraphs.",
    }),
    defineField({
      name: "challenge",
      title: "The challenge",
      type: "text",
      rows: 5,
      group: "story",
      description:
        "The problem the client came to us with. The first paragraph is shown large, so keep it to one strong sentence. Leave a blank line between paragraphs.",
    }),
    defineField({
      name: "solution",
      title: "Our solution",
      type: "text",
      rows: 5,
      group: "story",
      description: "What we designed and built. Leave a blank line between paragraphs.",
    }),
    defineField({
      name: "steps",
      title: "How we built it",
      type: "array",
      group: "story",
      description:
        "3 to 5 steps told as you scroll: the phone (or browser) beside the text switches to each step's screen. Shown after Our solution.",
      of: [
        defineArrayMember({
          type: "object",
          name: "step",
          fields: [
            { name: "title", title: "Title", type: "string", validation: (rule) => rule.required().max(60) },
            { name: "text", title: "Text", type: "text", rows: 3, validation: (rule) => rule.max(280) },
            {
              name: "screen",
              title: "Screen",
              type: "image",
              description: "Upload a screenshot, then use the crop tool to frame the part that matches this step.",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            },
            {
              name: "device",
              title: "Show in",
              type: "string",
              options: {
                list: [
                  { title: "Phone", value: "mobile" },
                  { title: "Browser", value: "desktop" },
                ],
                layout: "radio",
                direction: "horizontal",
              },
              initialValue: "mobile",
            },
          ],
          preview: { select: { title: "title", subtitle: "text", media: "screen" } },
        }),
      ],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "highlights",
      title: "Feature highlights",
      type: "array",
      group: "story",
      description:
        "4 to 6 standout features shown as a tiled grid. Tip: upload one long screenshot for each and crop it to the feature.",
      of: [
        defineArrayMember({
          type: "object",
          name: "highlight",
          fields: [
            { name: "title", title: "Title", type: "string", validation: (rule) => rule.required().max(60) },
            { name: "text", title: "Text", type: "text", rows: 2, validation: (rule) => rule.max(160) },
            {
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            },
          ],
          preview: { select: { title: "title", subtitle: "text", media: "image" } },
        }),
      ],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "results",
      title: "Results",
      type: "array",
      group: "story",
      description: "Up to 4 headline numbers, e.g. \"10k+\" / \"creators onboarded\".",
      of: [
        defineArrayMember({
          type: "object",
          name: "result",
          fields: [
            { name: "value", title: "Number", type: "string", validation: (rule) => rule.required().max(12) },
            { name: "label", title: "Label", type: "string", validation: (rule) => rule.required().max(60) },
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: "desktopScreens",
      title: "Desktop screens",
      type: "array",
      group: "screens",
      description:
        "Full-page website or dashboard screenshots (1440px wide or more). Long pages scroll inside a browser frame.",
      of: [
        defineArrayMember({
          type: "image",
          fields: [
            { name: "alt", title: "Alternative text", type: "string" },
            { name: "caption", title: "Caption", type: "string", description: "e.g. \"Landing page\"" },
          ],
        }),
      ],
    }),
    defineField({
      name: "mobileScreens",
      title: "Mobile screens",
      type: "array",
      group: "screens",
      description: "Mobile screenshots (750px wide or more). Shown in phone frames, best in threes; long pages scroll inside the frame.",
      of: [
        defineArrayMember({
          type: "image",
          fields: [
            { name: "alt", title: "Alternative text", type: "string" },
            { name: "caption", title: "Caption", type: "string" },
          ],
        }),
      ],
    }),
    defineField({
      name: "slides",
      title: "Case study slides",
      type: "array",
      group: "screens",
      description:
        "Optional: designed slides from a case study deck, shown after the screens. Export each page of the case study deck as an image (PNG or JPG, at least 1600px wide) and add them in order. Drag to reorder.",
      of: [
        defineArrayMember({
          type: "image",
          fields: [
            {
              name: "alt",
              title: "Alternative text",
              type: "string",
              description: "Briefly say what the slide covers, e.g. \"Overview and the challenge\".",
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "tagline", cover: "coverImage", logo: "logo" },
    prepare: ({ title, subtitle, cover, logo }) => ({ title, subtitle, media: cover || logo }),
  },
});
