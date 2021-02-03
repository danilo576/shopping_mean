var mongoose = require('mongoose');
const { Schema } = mongoose;

const RoditeljSchema = new Schema({
  Ime: String,
  Prezime: String,
  Email: String,
  Telefon: String,
  Deca: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ucenik',
  },
  Pol: String,
});

module.exports = mongoose.model('Roditelj', RoditeljSchema);
