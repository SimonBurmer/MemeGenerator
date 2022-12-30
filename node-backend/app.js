var createError = require('http-errors');
var express = require('express');
var cors = require("cors");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const templates = require("./routes/templates");
const dbConfig = require("./config/db.config");
const passport = require('passport');
// const session = require('express-session');
// var MongoDBStore = require('connect-mongodb-session')(session);
const db = require("./models");
const { mongoose } = require('./models');
const { requestLoggerMiddleware } = require("./middlewares/logger");
const dbUrl = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`
console.log(dbUrl)
db.mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


var debugRouter = require('./routes/debug');
var memeRouter = require('./routes/memes');
var commentRouter = require('./routes/comment');


var app = express();
// var store = new MongoDBStore({
//   uri: dbUrl,
//   collection: 'mySessions'
// });
app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Logger
app.use(requestLoggerMiddleware({ logger: console.log }));
// store.on('error', function(error) {
//   console.log(error);
// });

// Session
// app.use(session({
//   secret: 'omm secret',
//   resave: false,
//   saveUninitialized: false,
//   store: store,
// }))

// Passport middleware
app.use(passport.initialize())
//app.use(passport.session())

require('./config/jwtStrategy')(passport)
require('./config/passport.config.js')(passport)

//Routes
app.use('/debug', debugRouter);
app.use('/auth', require('./routes/auth.js'))
app.use("/img", templates);
app.use('/memes', memeRouter)
app.use('/comment', commentRouter)



//app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
