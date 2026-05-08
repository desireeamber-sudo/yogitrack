// middleware - protects routes from unauthenticated access

function requireAuth(req, res, next) {
  // always allow auth routes through
  if (req.path.startsWith("/auth/")) return next();

  // always allow static assets through (css, js, images)
  if (req.path.match(/\.(css|js|ico|png|jpg)$/)) return next();

  // always allow login page through
  if (req.path === "/login.html") return next();

  // check session - if not logged in, redirect to login
  if (!req.session || !req.session.userId) {
    // if it's an API call return 401, otherwise redirect
    if (req.path.startsWith("/customers") ||
        req.path.startsWith("/instructors") ||
        req.path.startsWith("/packages") ||
        req.path.startsWith("/classes") ||
        req.path.startsWith("/attendance")) {
      return res.status(401).json({ message: "Please log in" });
    }
    return res.redirect("/login.html");
  }

  next();
}

function requireManager(req, res, next) {
  if (!req.session || req.session.role !== "Manager") {
    return res.status(403).json({ message: "Manager access required" });
  }
  next();
}

module.exports = { requireAuth, requireManager };