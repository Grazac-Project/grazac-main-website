/*
 * Builds the Sanity Studio (./studio) into build/studio so it is served from
 * the website at /studio. Runs after `react-scripts build` (see package.json).
 *
 * Reuses the website's REACT_APP_SANITY_* variables, so the project ID only
 * has to be set once (in .env locally, and in Vercel's environment variables).
 */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
// Pick up REACT_APP_SANITY_* from a local .env (Vercel provides real env vars).
require("dotenv").config({ path: path.join(root, ".env") });
const studioDir = path.join(root, "studio");
const outDir = path.join(path.resolve(root, process.env.BUILD_PATH || "build"), "studio");

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.REACT_APP_SANITY_PROJECT_ID;
const dataset =
  process.env.SANITY_STUDIO_DATASET || process.env.REACT_APP_SANITY_DATASET || "production";

const warn = (message) => console.warn(`\n⚠️  Studio not built: ${message}\n`);

if (!projectId) {
  warn("set REACT_APP_SANITY_PROJECT_ID to include the Sanity Studio at /studio.");
  process.exit(0);
}

// Sanity v4 needs Node >=20.19 (but not 22.0–22.11).
const [major, minor] = process.versions.node.split(".").map(Number);
const nodeOk = (major === 20 && minor >= 19) || (major === 22 && minor >= 12) || major > 22;
if (!nodeOk) {
  warn(`Node ${process.versions.node} is too old for Sanity; use Node 22 in Vercel settings.`);
  process.exit(0);
}

const env = {
  ...process.env,
  SANITY_STUDIO_PROJECT_ID: projectId,
  SANITY_STUDIO_DATASET: dataset,
};
const run = (command) => execSync(command, { cwd: studioDir, env, stdio: "inherit" });

console.log(`\nBuilding Sanity Studio for project ${projectId} (${dataset}) into ${outDir}\n`);
if (!fs.existsSync(path.join(studioDir, "node_modules"))) {
  run("npm ci --no-audit --no-fund");
}
run(`npx sanity build "${outDir}" --yes`);
