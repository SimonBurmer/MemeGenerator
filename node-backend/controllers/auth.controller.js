const dotenv = require("dotenv");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
const User = require("../models/user.model");
const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const { name, email, sub, given_name } = ticket.getPayload();
  console.log(name + email + sub, given_name);

  const newUser = {
    provider: "google",
    googleId: sub,
    username: given_name,
    email: email,
    name: name,
  };

  const jwtoken = generateJWT(sub, email);

  res.status(201);
  res.Header;
  res.json({ sub, name, email, given_name, jwtoken });

  try {
    let user = await User.findOne({ googleId: sub });

    if (!user) {
      user = await User.create(newUser);
    }
  } catch (err) {
    console.error(err);
  }
};

const generateJWT = function (sub, email) {
  const secretOrKey = config.secret;
  let token = jwt.sign(
    {
      id: sub,
      email: email,
    },
    secretOrKey,
    { expiresIn: "1h" }
  );
  return token;
};

module.exports = {
  login,
};
