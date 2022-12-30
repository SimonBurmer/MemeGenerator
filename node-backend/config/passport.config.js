const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/user.model')
const config = require('./auth.config')

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.googleClientID,
        clientSecret: config.googleSecret,
        callbackURL: '/auth/google/callback',
//        proxy: true,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(accessToken)
        const newUser = {
          provider: 'google',
          googleId: profile.id,
          username: profile.name.givenName,
          email: profile.emails[0].value,
          name: profile.displayName,
        }

        try {
          let user = await User.findOne({ googleId: profile.id })

          if (user) {
            done(null, user)
          } else {
            user = await User.create(newUser)
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}