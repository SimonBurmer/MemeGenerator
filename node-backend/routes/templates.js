const upload = require("../middlewares/upload");
const express = require("express");
const uploadController = require("../controllers/upload.controller");
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middlewares/verifyAuth')

router.post("/upload", ensureAuth, uploadController.uploadFiles);
router.get("/all", uploadController.getListFiles);
router.get("/:name", uploadController.download);


module.exports = router;