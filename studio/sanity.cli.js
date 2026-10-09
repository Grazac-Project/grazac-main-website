import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
  // The Studio is served from the website at grazac.com.ng/studio
  // (built by scripts/build-studio.js, routed by vercel.json).
  project: { basePath: "/studio" },
});
