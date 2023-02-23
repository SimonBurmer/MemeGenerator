const mongoose = require("mongoose");
const schema = mongoose.Schema;

let template = new schema({
  creator: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: Date,
  image: {
    type: String,
    required: true,
  },
  accessibility: {
    type: String,
    enum: ["public", "unlisted", "private"],
    default: "public",
  },
});

const Template = mongoose.model("Template", template);

module.exports = Template;
