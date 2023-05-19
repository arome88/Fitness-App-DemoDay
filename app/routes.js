module.exports = function(app, passport, db) {

  // normal routes ===============================================================
  
      // show the home page (will also have our login links)
      app.get('/', function(req, res) {
          res.render('index.ejs');
      });

      app.get('/index', function(req, res) {
        res.render('index.ejs');
      });
  
      app.get('/workout', function(req, res) {
        res.render('workout.ejs');
      });

      app.get('/hydration-tracker', (req, res) => {
        db.collection('entries').find().toArray((err, entries) => {
          if (err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
          }
          res.render('hydration-tracker.ejs', { entries, user: req.user }); // Pass 'user' object to the template
        });
      });
      

 // hydration tracker ===============================================================
  
 app.post('/entries', (req, res) => { 
  const { date, wtr } = req.body;
  const user = req.user;

  db.collection('entries').save({ user: user.local.email, date, wtr, check: false }, (err, result) => {
    if (err) return console.log(err)
    console.log('Saved to database');
    res.redirect('/hydration-tracker');
  });
});



  
  
      // PROFILE SECTION =========================
      app.get('/profile', isLoggedIn, function(req, res) {
          db.collection('messages').find().toArray((err, result) => {
            if (err) return console.log(err)
            res.render('profile.ejs', {
              user : req.user,
              messages: result
            })
          })
      });
  
      // LOGOUT ============================== *
      app.get('/logout', function(req, res) {
          req.logout(() => {
            console.log('User has logged out!')
          });
          res.redirect('/');
      });
  
  // message board routes ===============================================================
  
    
  //DELETE
      app.delete('/entries', (req, res) => {
        db.collection('entries').findOneAndDelete({date: req.body.date, wtr: req.body.wtr}, (err, result) => {
          if (err) return res.send(500, err)
          res.send('entry deleted!')
        })
      })
  
  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================
  
      // locally -------------------------------- *
          // LOGIN ===============================
          // show the login form
          app.get('/login', function(req, res) {
              res.render('login.ejs', { message: req.flash('loginMessage') });
          });
  
          // process the login form
          app.post('/login', passport.authenticate('local-login', {
              successRedirect : '/profile', // redirect to the secure profile section
              failureRedirect : '/login', // redirect back to the signup page if there is an error
              failureFlash : true // allow flash messages
          }));
  
          // SIGNUP ================================= *
          // show the signup form
          app.get('/signup', function(req, res) {
              res.render('signup.ejs', { message: req.flash('signupMessage') });
          });
  
          // process the signup form *
          app.post('/signup', passport.authenticate('local-signup', {
              successRedirect : '/profile', // redirect to the secure profile section
              failureRedirect : '/signup', // redirect back to the signup page if there is an error
              failureFlash : true // allow flash messages
          }));
  
  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future
  
      // local ----------------------------------- *
      app.get('/unlink/local', isLoggedIn, function(req, res) {
          let user            = req.user;
          user.local.email    = undefined;
          user.local.password = undefined;
          user.save(function(err) {
              res.redirect('/profile');
          });
      });
  
  };
  
  // route middleware to ensure user is logged in *
  function isLoggedIn(req, res, next) {
      if (req.isAuthenticated())
          return next();
  
      res.redirect('/');
  }
  