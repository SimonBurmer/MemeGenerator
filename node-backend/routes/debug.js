const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/requireJwtAuth");

router.get("/debug", verifyToken, (req, res, next) => {
  res.send("plss");
});

module.exports = router;
