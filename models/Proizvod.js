const mongoose = require('mongoose');

const ProizvodSchema = new mongoose.Schema({
  trzniCentar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrzniCentar',
    required: [true, 'Proizvoda mora pripadati nekom trznom centru'],
  },
  naziv: {
    type: String,
    required: [true, 'Naziv proizvoda je obavezan'],
  },
  cena: {
    type: Number,
    min: [10, 'Ne moze ispod 10 dinara da kosta proizvod'],
    required: [true, 'Obavezna je cena proizvoda'],
  },
  kolicina: {
    type: Number,
    required: [true, 'Unesite kolicinu proizvoda'],
  },
  slika: {
    type: String,
    default: 'no-photo.jpg',
  },
});

// Ovim ogranicavam da u jednom trznom centru ne mogu postojati 2 proizvoda sa istim imenom
ProizvodSchema.index({ trzniCentar: 1, naziv: 1 }, { unique: true });

module.exports = mongoose.model('Proizvod', ProizvodSchema);
