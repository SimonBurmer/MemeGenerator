const express = require('express')
const passport = require('passport')
const router = express.Router()

// @desc    Auth with Google
// @route   GET /auth/google
// http://localhost:3001/auth/google
router.get('/google', passport.authenticate('google', { scope: ['email','profile'] }))

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/editor')
  }
)

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res, next) => {
  req.logout((error) => {
      if (error) {return next(error)}
      res.redirect('/')
  })
})

module.exports = router