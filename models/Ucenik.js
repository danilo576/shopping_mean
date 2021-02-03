const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NapomenaSchema = new Schema({
  Tekst: String,
  Datum: String,
});
const DogadjajSchema = new Schema({
  Tekst: String,
  Datum: String,
});
const DanSchema = new Schema({
  Dan: String,
  Predmeti: [String],
});
const IzostanakSchema = new Schema({
  Razred: Number,
  Polugodiste: String,
  Tip: String,
  Predmet: String,
  Datum: String,
});
const OcenaSchema = new Schema({
  Razred: Number,
  Polugodiste: String,
  Vrednost: Number,
});
const PredmetSchema = new Schema({
  Naziv: String,
  Ocene: [OcenaSchema],
  ZakljucnaOcena: [OcenaSchema],
});
const ForumPostSchema = new Schema({
  TipPosta: String,
  Sadrzaj: String,
  Datum: String,
  ProfesorIme: String,
});
const ProsekSchema = new Schema({
  Razred: Number,
  Polugodiste: String,
  Vrednost: Number,
});
const UcenikSchema = new Schema({
  Ime: String,
  Prezime: String,
  Jmbg: String,
  DatumRodjenja: String,
  Adresa: String,
  Email: String,
  Razred: Number,
  Odeljenje: Number,
  Vladanje: Number,
  Napomene: [NapomenaSchema],
  Dogadjaji: [DogadjajSchema],
  Raspored: [DanSchema],
  Izostanci: [IzostanakSchema],
  Predmeti: [PredmetSchema],
  Post: [ForumPostSchema],
  Prosek: [ProsekSchema],
  Razredni: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profesor',
  },
  Pol: String,
});

const User = mongoose.model('Ucenik', UcenikSchema);
module.exports = User;
