const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.meme = require("./meme.model");
db.template = require("./template.model");

module.exports = db;