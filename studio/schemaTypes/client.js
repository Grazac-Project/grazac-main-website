import { defineField, defineType } from "sanity";

// A Grazac Build client, shown as a logo in "Innovative products our clients have built" on /build.
export default defineType({
  name: "client",
  title: "Build client",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description: "A transparent PNG or SVG works best. It is shown in grey and turns colour on hover.",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "website", title: "Website", type: "url" }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers show first.",
    }),
  ],
  preview: { select: { title: "name", media: "logo" } },
});
