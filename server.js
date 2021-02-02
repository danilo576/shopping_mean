const express = require('express');
const dotenv = require('dotenv');
const trzniCentri = require('./routes/trzniCentri');
const logger = require('./middleware/logger');

// Ucitava mi variable iz config fajla
dotenv.config({ path: './config/config.env' });

const app = express();

//Na svaki moj napravljen req se poziva ovaj middlwware
app.use(logger);

// Montiram rute, sve rute koje dolazi iz uvedenog fajla imace prefiks prvog parametra
app.use('/api/trzniCentri', trzniCentri);

const PORT = 5000;
app.listen(PORT, console.log(`Server is listening on port ${PORT}`));
