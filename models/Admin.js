const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  trzniCentar: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Mora postojati trzni centar za ovog admina'],
    // Stavljam unique jer u jednom trenutku trzni centar moze imati za vlasnika samo jednog admina
    unique: true,
    ref: 'TrzniCentar',
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    //Unique jer jedan admin more upravljati samo jednim trznim centrom
    unique: true,
    required: [true, 'Email adresa admina je obavezna'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Morate da unesete ispravnu email adresu',
    ],
  },
  ime: {
    type: String,
    required: [true, 'Ime je obavezno polje'],
  },
  prezime: {
    type: String,
    required: [true, 'Prezime je obavezno polje'],
  },
});

module.exports = mongoose.model('Admin', AdminSchema);
