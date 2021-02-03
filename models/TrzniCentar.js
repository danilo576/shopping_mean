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
});

module.exports = mongoose.model('TrzniCentar', TrzniCentarSchema);
