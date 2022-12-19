const upload = require("../middlewares/upload");
const express = require("express");
const uploadController = require("../controllers/upload.controller");
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middlewares/verifyAuth')

router.post("/upload",ensureAuth, uploadController.uploadFiles);
router.get("/all",ensureAuth, uploadController.getListFiles);
router.get("/:name",ensureAuth, uploadController.download);


module.exports = router;