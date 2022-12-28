module.exports = {
    ensureAuth: function (req, res, next) {

      if (req.isAuthenticated()) {
        return next()
      } else {
        res.sendStatus(401)
      }
    },
    ensureGuest: function (req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      } else {
        res.sendStatus(401)
      }
    },
  }