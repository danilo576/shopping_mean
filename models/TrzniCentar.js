const mongoose = require('mongoose');

const TrzniCentarSchema = new mongoose.Schema({
  naziv: {
    type: String,
    required: [true, 'Molimo vas da unesete naziv trznog centra'],
    unique: true,
  },
  lokacija: {
    type: String,
    required: [true, 'Lokacija trznog centra je obavezna'],
    minlength: [2, 'Ime lokacije mora sadrzati vise od 2 karaktera'],
    maxlength: [10, 'Ime lokacije ne moze biti vece od 10 karaktera'],
  },
  adresa: {
    type: String,
    unique: true,
    required: [true, 'Adresa je obavezno polje'],
    minlength: [5, 'Adresa mora imati vise od 5 karaktera'],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, 'Email adresa je obavezna'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Morate da unesete ispravnu email adresu',
    ],
  },
});

module.exports = mongoose.model('TrzniCentar', TrzniCentarSchema);
