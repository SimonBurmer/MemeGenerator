const express = require('express')
const router = express.Router()
const memeController = require("../controllers/meme.controller");
const requireJwtAuth = require("../middlewares/requireJwtAuth")
// saves Meme to db if exists, otherwise updates it
router.post("/save", memeController.saveMeme);
// get a single meme for the db 
// parameter: meme id
router.get("/getSingle", memeController.getMeme);

// parameter: meme id
router.patch("/update", memeController.updateMeme);

router.get("/all", memeController.allMemes);

router.get("/retrieve",  memeController.retrieve);

router.delete("/delete", memeController.deleteMeme);

router.post("/add", memeController.addLike)

module.exports = router