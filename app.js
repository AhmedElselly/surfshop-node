require("dotenv").config();

const createError = require('http-errors');
const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const session = require("express-session");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const favicon = require('serve-favicon');

// const seedPosts = require('./seeds');

// seedPosts();

const index   = require('./routes/index');
const posts   = require('./routes/posts');
const reviews = require('./routes/reviews');

const app = express();

//connect to database
mongoose.connect("mongodb://localhost:27017/surf-shop-14", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=>{
  console.log("We are connected");
});

//use ejs-local for all ejs templates
app.engine('ejs', engine);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//setup public assests for design folder CSS, images and javascript
app.use(express.static('public'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"));

// Add moment to every view
app.locals.moment = require('moment');

app.use(session({
  secret: "I love Rujy",
  resave: false,
  saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//set local variables for middleware
app.use(function(req, res, next){
  // console.log(res.locals);
  // req.user={
  //   '_id' : '5dfca5bad0af891e30a6b6af',
  //   'username' : 'AhmedElselly'
  // }
  res.locals.currentUser = req.user;
  res.locals.title = 'Surf Shop';
  //set success flash message
  res.locals.success = req.session.success || '';
  delete req.session.success;
  //set error flash message
  res.locals.error = req.session.error || '';
  delete req.session.error;
  //continue in next function in middleware chain
  next();
});


//mount routes
app.use('/', index);
app.use('/posts', posts);
app.use('/posts/:id/reviews', reviews);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  // res.status(err.status || 500);
  // res.render('error');
  console.log(err);
  req.session.error = err.message;
  res.redirect('back');
});



module.exports = app;
