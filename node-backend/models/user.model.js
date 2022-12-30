const path = require('path');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config')


const userSchema = new mongoose.Schema(
  {
    provider: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9_]+$/, 'is invalid'],
      index: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true,
    },
    password: {
      type: String,
      trim: true,
      minlength: 6,
      maxlength: 60,
    },
    name: String,
    // google
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  },
  { timestamps: true },
);


const secretOrKey = config.secret;

userSchema.methods.generateJWT = function () {
  let token = jwt.sign({
      id: this._id,
      provider: this.provider,
      email: this.email,
    },
    secretOrKey,
    {expiresIn: '1h'}
  );
  return token
};


module.exports = mongoose.model('User', userSchema)
