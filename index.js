var express = require('express');
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var port = 3000;

var app = express();

app.use(session({ secret: 'un secreto'}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
  clientID: "766164483564763",
  clientSecret:"db529e9141d55dac25e20964c1b551a3",
  callbackURL: "http://localhost:3000/auth/facebook/callback"
}, function (token, refreshToken, profile, done){
  done(null, profile)
  /*This is where you would reference your db to look for the user*/
}))

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/me',
  failureRedirect: '/auth/facebook'
}));

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

  app.get('/me', function (req, res){
    res.send(req.user)
  })



app.listen(port, function() {
  console.log('listening on port:', port)
});
