const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middlewares/verifyAuth')


router.get('/api/test/all', ensureGuest, (req, res) => {
  res.send('public')
})

router.get('/api/test/user', ensureAuth, async (req, res) => {
  try {
    res.send(req.user.firstName)
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})


module.exports = router;
