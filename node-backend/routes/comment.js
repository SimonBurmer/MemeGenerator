const express = require("express");
const router = express.Router()
const Comment = require("../models/commentSchema");
const requireJwtAuth = require("../middlewares/requireJwtAuth")



router.post("/addComment", requireJwtAuth, (req, res) => {
    let comment = new Comment({
        meme: req.body.meme,
        author: req.body.author,
        content: req.body.content,
        date: new Date().toISOString()
    })
    comment.save()
        .then(() => res.send("Saved comment!"))
        .catch(err => console.error(err))
})


router.get("/allComments", (req, res) => {
    Comment.find({meme: req.query.meme}).then(comments => {
        res.send(comments)
    }, err => console.error(err))
})


router.get("/allCommentsFromAll", (req, res) => {
    Comment.find().then(comments => {
        res.send(comments)
    }, err => console.error(err))
})


router.delete("/deleteComment", requireJwtAuth, (req, res) => {
    let dbFilter = {}
    if (req.body.meme) dbFilter.meme = req.body.meme
    if (req.body.author) dbFilter.author = req.body.author
    if (req.body.comment) dbFilter.content = req.body.comment
    Comment
        .findOneAndDelete(dbFilter)
        .then(result => {
            if (result) {
                res.send(result)
            }
        })
        .catch(err => console.log(err))
})

module.exports = router