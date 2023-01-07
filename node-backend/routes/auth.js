const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/google/login", authController.login);

module.exports = router;
