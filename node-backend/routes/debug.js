const express = require("express");
const router = express.Router();

router.get('/debug', (req, res, next) => {

    res.send(req.cookies)
  })


module.exports = router;