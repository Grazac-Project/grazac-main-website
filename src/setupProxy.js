// Local development only (used by `npm start`, ignored by the production build).
// In production the Studio is served at /studio by vercel.json; locally it runs
// on its own dev server (`cd studio && npm run dev`), so send /studio there.
const STUDIO_DEV_URL = "http://localhost:3333/studio/";

module.exports = function setupProxy(app) {
  app.get(["/studio", "/studio/*"], (req, res) => {
    const rest = req.path.replace(/^\/studio\/?/, "");
    res.redirect(302, STUDIO_DEV_URL + rest);
  });
};
