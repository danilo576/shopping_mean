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
  if (req.body.type == 'ucenik') {
    const Ime = req.body.ime;
    const Prezime = req.body.prezime;
    const Jmbg = req.body.jmbg;
    const DatumRodjenja = req.body.datumrodjenja;
    const Adresa = req.body.adresa;
    const Email = req.body.username;
    const Razred = req.body.razred;
    const Odeljenje = req.body.odeljenje;
    const Vladanje = req.body.vladanje;
    const Napomene = req.body.napomene;
    const Dogadjaji = req.body.dogadjaji;
    //if(Razred == 1)
    const Raspored = [
      {
        Predmeti: [
          'Srpski',
          'Engleski',
          'Matematika',
          'Istorija',
          'Fizicko',
          'Hemija',
        ],
        Dan: 'Ponedeljak',
      },
      {
        Predmeti: [
          'Srpski',
          'Engleski',
          'Matematika',
          'Istorija',
          'Fizicko',
          'Hemija',
        ],
        Dan: 'Utorak',
      },
      {
        Predmeti: [
          'Srpski',
          'Engleski',
          'Matematika',
          'Istorija',
          'Fizicko',
          'Hemija',
        ],
        Dan: 'Sreda',
      },
      {
        Predmeti: [
          'Srpski',
          'Engleski',
          'Matematika',
          'Istorija',
          'Fizicko',
          'Hemija',
        ],
        Dan: 'Cetvrtak',
      },
      {
        Predmeti: [
          'Srpski',
          'Engleski',
          'Matematika',
          'Istorija',
          'Fizicko',
          'Hemija',
        ],
        Dan: 'Petak',
      },
    ];
    const Izostanci = req.body.izostanci;
    const Predmeti = [
      { Naziv: 'Istorija', Ocene: [], ZakljucnaOcena: [] },
      { Naziv: 'Engleski', Ocene: [], ZakljucnaOcena: [] },
      { Naziv: 'Informatika', Ocene: [], ZakljucnaOcena: [] },
      { Naziv: 'Vladanje', Ocene: [], ZakljucnaOcena: [] },
    ];
    const Post = req.body.post;
    const Pol = req.body.pol;
    const Prosek = req.body.prosek;
    const Razredni = req.body.razredni;
    const noviUcenik = new Ucenik({
      Ime,
      Prezime,
      Jmbg,
      DatumRodjenja,
      Adresa,
      Email,
      Razred,
      Odeljenje,
      Vladanje,
      Napomene,
      Dogadjaji,
      Raspored,
      Izostanci,
      Predmeti,
      Post,
      Prosek,
      Razredni,
      Pol,
    });
    noviUcenik
      .save()
      .then(() => res.json('Dodali smo ucenika u bazu!'))
      .catch((err) => res.status(400).json('Error: ' + err));
  }
  if (req.body.type == 'roditelj') {
    let RoditeljModel = require('./models/Roditelj');

    const Ime = req.body.ime;
    const Prezime = req.body.prezime;
    const Email = req.body.username;
    const Telefon = req.body.Telefon;
    const Deca = req.body.idDeteta;
    const Pol = req.body.Pol;

    let noviRoditelj = new RoditeljModel(
      Ime,
      Prezime,
      Email,
      Telefon,
      Deca,
      Pol
    );
    let saved = noviRoditelj.save();
  }
  if (req.body.type == 'profesor') {
    const ime = req.body.ime;
    const prezime = req.body.prezime;
    const email = req.body.email;
    const predmet = req.body.predmet;
    const razredni = req.body.razredni;
    const pol = req.body.pol;
    const odeljenja = req.body.odeljenja;
    const odeljenjaRazredni = req.body.odeljenjaRazredni;
    const zahtevi = req.body.zahtevi;
    let prof = new Profesor({
      ime,
      prezime,
      email,
      predmet,
      razredni,
      odeljenja,
      zahtevi,
      pol,
    });
    console.log(req);
    prof
      .save()
      .then(() => res.json(prof))
      .catch((err) => res.status(400).json('Error: ' + err));
  }
});

app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: 'http://localhost:3000/preview',
    failureRedirect: '/greska',
  }),
  (req, res) => {}
);

app.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('http://localhost:3000/');
});

app.post('/resetpass', (req, res) => {
  User.findOne({ username: req.body.email }).then(
    (ucenik) => {
      if (ucenik) {
        ucenik.setPassword(req.body.pass, () => {
          ucenik.save();
          res.send('password reset successful');
        });
      } else {
        res.send('user does not exist');
      }
    },
    (error) => {
      console.log(error);
    }
  );
});

//Urosev controller za ucenika
let UcenikController = {
  all: async (req, res) => {
    let sviUcenici = await Ucenik.find();
    res.json(sviUcenici);
  },
  create: async (req, res) => {
    let noviUcenik = new Ucenik(req.body);
    let saved = await noviUcenik.save();
    res.json(saved);
  },
  find: async (req, res) => {
    let found = await Ucenik.find({ Ime: req.params.Ime });
    res.json(found);
  },
  findByEmail: async (req, res) => {
    let found = await Ucenik.find({ Email: req.params.Email });
    res.json(found);
  },
  findById: async (req, res) => {
    let sc = await Ucenik.find({ _id: req.params._id });
    res.json(sc);
  },
};
app.get('/Dete/:_id', UcenikController.findById);
app.get('/DeteEmail/:Email', UcenikController.findByEmail);

//Urosev controller za roditelja
app.get('/Roditelj', RoditeljControl.all);
app.get('/Roditelj/:Email', RoditeljControl.findByEmail);
app.get('/nadjiPrekoDeteta/:idDeteta', RoditeljControl.nadjiPrekoDeteta);
app.get('/Roditelj/GetRoditeljByEmail/:Email', RoditeljControl.findByEmail);

app.post('/posaljiMejl', function (req, res) {
  console.log(req.body.mejlRoditelja);

  const stmpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'aleksandar19981@gmail.com',
      pass: 'jaigramikariam.',
    },
  });
  const mailOptions = {
    to: req.body.mejlRoditelja,
    from: 'aleksandar19981@gmail.com',
    subject: 'Obavestenje iz skole',
    text: req.body.tekstPoruke,
  };
  stmpTransport.sendMail(mailOptions, function (err) {
    console.log('mail sent');
    console.log('POSLAT MAILL');
    console.log(err);
    //done(err, 'done');
  });
});

app.post('/vratiRoditelja', (req, res) => {
  Roditelj.find({ Email: req.body.email }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result[0]);
    }
  });
});

app.post('/vratiDete', (req, res) => {
  Ucenik.find({ Email: req.body.email }, (err, result) => {
    if (err) res.send(err);
    else res.send(result[0]);
  });
});

app.post('/Roditelj/PosaljiZahtev', (req, res) => {
  Profesor.create({});
});

app.get('/api/current_user', (req, res) => {
  res.send(req.user);
});

app.post('/subscribe', (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: 'Push Test' });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
});

app.get('/forgot', function (req, res) {
  res.redirect('http://localhost:3000/Forget');
});

app.post('/forgot', function (req, res, next) {
  async.waterfall(
    [
      function (done) {
        crypto.randomBytes(20, function (err, buf) {
          const token = buf.toString('hex');
          done(err, token);
        });
      },
      function (token, done) {
        User.findOne({ username: req.body.username }, function (err, user) {
          if (!user) {
            console.log('ERROR');
            return res.redirect('http://localhost:3000/Forget');
          }

          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; //1 sat

          user.save(function (err) {
            done(err, token, user);
          });
        });
      },
      function (token, user, done) {
        const stmpTransport = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: 'aleksandar19981@gmail.com',
            pass: 'jaigramikariam.',
          },
        });
        const mailOptions = {
          to: user.username,
          from: 'aleksandar19981@gmail.com',
          subject: 'Node.js Password Reset',
          text:
            'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' +
            req.headers.host +
            '/reset/' +
            token +
            '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n',
        };
        stmpTransport.sendMail(mailOptions, function (err) {
          console.log('mail sent');
          console.log('POSLAT MAILL');
          done(err, 'done');
        });
      },
    ],
    function (err) {
      if (err) return next(err);
      res.redirect('http://localhost:3000/Forget');
    }
  );
});
app.get('/reset/:token', function (req, res) {
  User.findOne(
    {
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    },
    function (err, user) {
      if (!user) {
        console.log('Greska je' + err);
        return res.redirect('http://localhost:3000/Forget');
      }
      res.redirect('http://localhost:3000/Reset/?token=' + req.params.token);
    }
  );
});

app.post('/reset/:token', function (req, res) {
  async.waterfall(
    [
      function (done) {
        console.log('Token je:' + req.params.token);
        console.log('Datum je:' + Date.now());
        User.findOne(
          {
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() },
          },
          function (err, user) {
            if (!user) {
              console.log('Password reset token is invalid or has expired.');
              return res.redirect('http://localhost:3000/Forget');
            }
            if (req.body.password === req.body.confirm) {
              user.setPassword(req.body.password, function (err) {
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;

                user.save(function (err) {
                  req.logIn(user, function (err) {
                    done(err, user);
                  });
                });
              });
            } else {
              console.log('Passwords do not match.');
              return res.redirect('http://localhost:3000/Forget');
            }
          }
        );
      },
      function (user, done) {
        var smtpTransport = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: 'aleksnadr19981@gmail.com',
            pass: 'jaigramikariam.',
          },
        });
        var mailOptions = {
          to: user.email,
          from: 'aleksandar19981@gmail.com',
          subject: 'Your password has been changed',
          text:
            'Hello,\n\n' +
            'This is a confirmation that the password for your account ' +
            user.username +
            ' has just been changed.\n',
        };
        smtpTransport.sendMail(mailOptions, function (err) {
          console.log('Success! Your password has been changed.');
          done(err);
        });
      },
    ],
    function (err) {
      res.redirect('/');
    }
  );
});

//Danilov controller za profesore i ucenike
app.use('/profesori', profesorRouter);
app.use('/ucenici', ucenikRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
