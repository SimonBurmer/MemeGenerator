const express = require("express");
const router = express.Router();

router.get("/getUser", (req, res) => {
  res.json(req.user);
});

module.exports = router;
