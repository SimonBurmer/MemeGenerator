const mongoose = require('mongoose')
const schema = mongoose.Schema

let meme = new schema({
    author: {
        type: String, required: true
    },
    name: {
        type: String, required: true
    },
    date: Date,
    templates: [{url: String, x: Number, y: Number, width: Number, height: Number}],
    texts:[{value:String, x:Number, y:Number, fontSize:Number, fontFamily:String, rotate:Number}],
    canvasWidth: Number,
    filename: String,
    canvasHeight: Number,
    color: String,
    size: Number,
    votes: {
        type: [String], default: []
    },
    private: {
        type: Boolean, default: false
    },
    url: String
})

const Meme = mongoose.model("Meme", meme)

module.exports = Meme