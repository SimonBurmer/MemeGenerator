const config = require('../config/auth.config');
const User = require('../models/user.model')
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = function(req) {
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['jwt'];
    }
    return token;
};
opts.secretOrKey = config.secret;


module.exports = function (passport){
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log("JWT BASED  VALIDATION GETTING CALLED")
    console.log("JWT", jwt_payload)
    if (CheckUser(jwt_payload)) {
        return done(null, jwt_payload)
    } else {
        // user account doesnt exists in the DATA
        return done(null, false);
    }
}));
}

async function CheckUser(input){
  console.log(input)
  try {
    let user = await User.findOne({ _id: input.id })

    if (user) {
      return true
    } else {
      null
    }
  } catch (err) {
    console.error(err)
  }
    
  return false
}


