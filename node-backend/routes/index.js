const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middlewares/verifyAuth')

// @desc    Login/Landing page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
  res.send('login')
})


router.get('/editor', ensureAuth, async (req, res) => {
  try {
    res.send(req.user.firstName)
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

module.exports = router