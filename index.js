const Roditelj = require('./models/Roditelj');
const Ucenik = require('./models/Ucenik');
const Profesor = require('./models/Profesor');
const User = require('./models/User');
const RoditeljControl = require('./controllers/RoditeljController');
const profesorRouter = require('./controllers/ProfesorController');
const ucenikRouter = require('./controllers/UcenikController');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const LocalStratrgy = require('passport-local');
const cors = require('cors');
const webpush = require('web-push');
const path = require('path');
const flash = require('express-flash');
const async = require('async');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

mongoose
  .connect(
    'mongodb+srv://aleksandar:noapas123@cluster0.k3chi.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log('Connected to Database');
  })
  .catch((err) => {
    console.log('Not Connected to Database ERROR! ', err);
  });

const app = express();

app.use(express.static(path.join(__dirname, '/')));

app.use(cors());

app.use(flash());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  require('express-session')({
    secret: 'Neki string',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStratrgy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}

app.get('/worker.js', (req, res) => {
  res.writeHead(201, {
    'Content-Type': 'application/javascript',
  });
  res.sendFile(
    path.resolve(__dirname, 'client', 'src', 'components', '/worker.js')
  );
});

app.get('/work/worker', (req, res) => {
  res.send({ hi: 'there' });
});

app.get('/', (req, res) => {
  req.flash('error_messages', 'greskaaa');
  res.redirect('http://localhost:3000/login');
});

app.get('/greska', isLoggedIn, (req, res) => {
  req.flash('error_messages', 'greskaaa');
  res.redirect('http://localhost:3000/login');
});

app.post('/register', (req, res) => {
  User.register(
    new User({ username: req.body.username, type: req.body.type }),
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(err);
        res.send(err);
      }
      passport.authenticate('local')(req, res, () => {
        res.redirect('http://localhost:3000/preview');
      });
    }
  );
  

const PORT = process.env.PORT || 5000;
app.listen(PORT);
