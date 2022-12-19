const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middlewares/verifyAuth')
const memeController = require("../controllers/meme.controller");

// saves Meme to db if exists, otherwise updates it
router.post("/save", memeController.saveMeme);
// get a single meme for the db 
// parameter: meme id
router.get("/getSingle", memeController.getMeme);

router.get("/all", memeController.allMemes);

router.get("/retrieve",  memeController.retrieve);

router.delete("/delete", memeController.deleteMeme);

module.exports = router