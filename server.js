const express = require('express');
const dotenv = require('dotenv');

// Ucitava mi variable iz config fajla...
dotenv.config({ path: './config/config.env' });

const app = express();

// Sa process.env pristupamo config.env fajlu pa navodimo ime variable kojoj zelimo pristup
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is listening on port ${PORT}`));
