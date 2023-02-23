const upload = require("../middlewares/upload");
const express = require("express");
const uploadController = require("../controllers/upload.controller");
const router = express.Router();
const verifyToken = require("../middlewares/requireJwtAuth");

router.post("/upload", uploadController.uploadFiles);
router.get("/all", uploadController.getListFiles);
router.get("/meme/:name", uploadController.downloadMeme);
router.get("/template/:name", uploadController.downloadTemplate);
router.post("/addTemplate", uploadController.addTemplate);

module.exports = router;
