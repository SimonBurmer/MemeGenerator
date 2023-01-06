const express = require("express");
const { ensureAuth, ensureGuest } = require("../middlewares/verifyAuth");

const router = express.Router();

router.get("/getUser", ensureAuth, (req, res) => {
  res.json(req.user);
});

module.exports = router;
