const express = require('express')
const passport = require('passport')
const router = express.Router()

const CLIENT_URL = "http://localhost:3000/";

router.get("/login/success", (req, res) => {
  console.log(req.user)
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //cookies: req.cookies
    });
  }else{
    res.status(401).json({
      success: false,
      message: "failure",
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

// @desc    Auth with Google
// @route   GET /auth/google
// http://localhost:5000/auth/google
router.get('/google', passport.authenticate('google', { scope: ['email','profile'] }))

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/auth/login/failed",
  })
)

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res, next) => {
  req.logout((error) => {
      if (error) {return next(error)}
      res.redirect('http://localhost:3000/')
  })
})

module.exports = router