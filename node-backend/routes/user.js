const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller")

router.get("/getUserById", userController.getUserById);
router.get("/getCurrentUser", userController.getCurrentUser);

module.exports = router;
