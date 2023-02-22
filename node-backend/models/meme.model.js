const mongoose = require("mongoose");
const schema = mongoose.Schema;

let meme = new schema({
  memeURL: String,
  creatorId: String,
  title: String,
  creationDate: Date,
  accessibility: {
    type: String,
    enum: ["public", "unlisted", "private"],
    default: "public",
  },
  votes: [
    {
      userId: {
        type: String,
      },
      votingType: {
        type: String,
        enum: ["like", "dislike"],
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
  templates: [
    {
      src: String,
      x: Number,
      y: Number,
      width: Number,
      height: Number,
    },
  ],
  texts: [
    {
      text: String,
      width: Number,
      height: Number,
      x: Number,
      y: Number,
      textColor: String,
      backgroundColor: String,
      fontSize: Number,
      fontFamily: String,
    },
  ],

  canvasWidth: Number,
  canvasHeight: Number,
});

const Meme = mongoose.model("Meme", meme);

module.exports = Meme;
