const jwt = require("jsonwebtoken");
const jwtToken = process.env.SECRET_KEY;
function isAdmin(req, res, next) {
  try {
    if (!req.cookies.token) {
      return res.render("admin/login"); // ✅ Added return and corrected path
    }

    const admin = jwt.verify(req.cookies.token, jwtSecret);
    req.admin = admin; // ✅ Fixed typo

    console.log(admin);
    next();
  } catch (err) {
    console.error(err);
    return res.render("admin/login"); // ✅ Handle token verification errors
  }
}
module.exports = { isAdmin };
