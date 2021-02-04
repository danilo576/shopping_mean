const express = require('express');
const dotenv = require('dotenv');
const trzniCentri = require('./routes/trzniCentri');
const poveziBazu = require('./config/db');
const errorHandler = require('./middleware/error');
require('colors');

// Ucitava mi variable iz config fajla
dotenv.config({ path: './config/config.env' });

// U MongoDB Compas za uspostavljanje veze nalepi string koji se nalazi u folderu /config/config.env --> MONGO_URL
poveziBazu();

const app = express();

// Body parser --> req.body parsuje, inace je undefined
app.use(express.json());

// Montiram rute, sve rute koje dolazi iz uvedenog fajla imace prefiks prvog parametra
app.use('/api/trzniCentri', trzniCentri);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server is listening on port ${PORT}`.cyan.underline)
);
