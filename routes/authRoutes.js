const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/checkAuth", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ user: null });
  }
});

router.post("/signup", passport.authenticate("local-signup"), (req, res) => {
  res.status(201).json({ message: "Signup successful" });
});

router.post("/login", passport.authenticate("local-login"), (req, res) => {
  res.status(200).json({ message: "Login successful" });
});

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
