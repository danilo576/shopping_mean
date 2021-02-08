const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const trzniCentri = require('./routes/trzniCentri');
const proizvodi = require('./routes/proizvodi');
const admini = require('./routes/admini');
const poveziBazu = require('./config/db');
const errorHandler = require('./middleware/error');
const fileupload = require('express-fileupload');
require('colors');

// Ucitava mi variable iz config fajla u process.env
dotenv.config({ path: './config/config.env' });

// U MongoDB Compas za uspostavljanje veze nalepi string koji se nalazi u folderu /config/config.env --> MONGO_URL
poveziBazu();

const app = express();

// Body parser --> req.body parsuje, inace je undefined
app.use(express.json());

//File upload
app.use(fileupload());

// Postavljamo 'public' folder kao 'static' folder
// Ovim u browseru sa http://localhost:5000/slike/slika_601ba174c183d12f70f8486a.jpg dobijam odredjenu sliku
app.use(express.static(path.join(__dirname, 'public')));

// Montiram rute, sve rute koje dolazi iz uvedenog fajla imace prefiks prvog parametra
app.use('/api/trzniCentri', trzniCentri);
app.use('/api/proizvodi', proizvodi);
app.use('/api/admini', admini);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server is listening on port ${PORT}`.green.inverse.italic.underline
  )
);
