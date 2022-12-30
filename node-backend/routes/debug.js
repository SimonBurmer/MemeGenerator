const express = require("express");
const router = express.Router();
const requireJwtAuth = require("../middlewares/requireJwtAuth")

router.get('/debug', requireJwtAuth,(req, res, next) => {

    res.send("plss")
  })


module.exports = router;