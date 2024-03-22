require("dotenv").config();
export async function checkIfAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect(process.env.CLIENT_URL);
}
