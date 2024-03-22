const express = require("express");
const router = express.Router();
const passport = require("passport");
const { getDetails, deleteAccount } = require("../Controllers/AuthController");
require("dotenv").config();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/`,
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  }
);

router.get("/check", (req, res) => {
  if (req.isAuthenticated()) {
    res.send({ user: req.user });
  } else {
    res.send({ user: null });
  }
});

router.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    res.json({ message: "Logged out!" });
  });
});

router.post("/getDetails", getDetails);
router.delete("/delete-account", deleteAccount);

module.exports = router;
