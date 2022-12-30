const upload = require("../middlewares/upload");
const express = require("express");
const uploadController = require("../controllers/upload.controller");
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middlewares/verifyAuth')
const requireJwtAuth = require("../middlewares/requireJwtAuth")

router.post("/upload",requireJwtAuth, uploadController.uploadFiles);
router.get("/all", uploadController.getListFiles);
router.get("/:name", uploadController.download);


module.exports = router;