const express = require('express');
const { passport, getUser } = require('./auth');
const app = express();
const PORT = 3000;
var cors = require('cors')

require('./auth')
// Use session to keep track of login status

app.use(cors({origin:"http://localhost:3001"}))
app.use(require('express-session')({ secret: 'mysecret', resave: true, saveUninitialized: true,cookie:{secure:false} }));
app.use(passport.initialize());
app.use(passport.session());


app.get('/auth/google',
  passport.authenticate('google', { scope: ['email','profile'] })
);

var id= 0;
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Redirect to the home page or the app dashboard after successful login
    console.log(req.user.id);
    id=req.user.id;
    res.redirect('http://localhost:3001/about');
  }
);

app.get('/logout', (req, res) => {
  req.session.destroy();

  req.logout(() => { });
  
  res.redirect('http://localhost:3001');
});

app.get('/user', (req, res) => {
  const user = getUser();
  res.json({userid: id, user });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
