const express = require('express');
const passport = require('passport');

const app = express();
const PORT = 3000;

require('./auth')
// Use session to keep track of login status
function isLoggedIn(req,res,next)
{
    req.user? next() : res.sendStatus(401)
}
app.use(require('express-session')({ secret: 'mysecret', resave: true, saveUninitialized: true,cookie:{secure:false} }));
app.use(passport.initialize());
app.use(passport.session());



app.get('/auth/google',
  passport.authenticate('google', { scope: ['email','profile'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Redirect to the home page or the app dashboard after successful login
    res.redirect('/auth/protected');
  }
);

app.get('/auth/logout', (req, res) => {
  req.session.destroy();
  res.send("Have a nice day");
//   req.logout();
//   res.redirect('/');
});

app.get('/auth/protected',isLoggedIn, (req, res) => {
    // let name= req.user.displayName;
    // res.send(`Hello ${name}`);
     res.redirect('/');
  });

const invoices = [
    { id: 1, amount: 100, dueDate: '2024-01-31', recipient: 'HARSHIT SINGH' },
    
  ];
  
  // Endpoint to get invoice details for a user
  app.get('/api/invoices', (req, res) => {
    // Authenticate 
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    // Get invoice 
    const userName = req.user.displayName;
    const userInvoices = invoices.filter(invoice => invoice.recipient===userName );
  
    res.json(userInvoices);
  });
  
  
  

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
