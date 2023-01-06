const mongoose = require('mongoose')
const schema = mongoose.Schema

let meme = new schema({
    memeURL: String,
    creatorId: String,
    title: String,
    creationDate: Date,
    template: {
        type: String,
        enum: ['elon', 'doge', 'none'],
        default: 'none',
    },
    accessibility: {
        type: String,
        enum: ['public', 'unlisted', 'private'],
        default: 'public',
    },
    votes: [
        {
            userId: {
                type: String,
            },
            votingType: {
                type: String,
                enum: ['like', 'dislike'],
            },
            votingDate: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    comments: [
        {
            userId: {
                type: String,
            },
            comment: {
                type: String,
            },
            commentDate: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    images: [{url: String, x: Number, y: Number, width: Number, height: Number}],
    texts: [{value: String, x: Number, y: Number, fontSize: Number, fontFamily: String, rotate: Number}],

    // Unnecessary ?
    color: String,
    size: Number,
    canvasWidth: Number,
    canvasHeight: Number,
    filename: String,
})

const Meme = mongoose.model("Meme", meme)

module.exports = Meme