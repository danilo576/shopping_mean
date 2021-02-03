const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OdeljenjeSchema = new Schema({
    razred: Number,
    odeljenje: Number
})
const NaCekanjuSchema = new Schema({
    RoditeljId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Roditelj"
    },
    DeteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ucenik"
    },
    Razred: Number,
    Polugodiste: String,
    Tip: String,
    Predmet: String,
    Datum: String,
    Prihvata: Boolean,
    ImeDeteta:String,
    PrezimeDeteta: String
})
const ProfesorSchema = new Schema({
    ime:String,
    prezime:String,
    email:String,
    predmet:String,
    razredni: Boolean,
    odeljenja: [OdeljenjeSchema],
    odeljenjaRazredni:[OdeljenjeSchema],
    zahtevi: [NaCekanjuSchema],
    pol: String
});

const Profesor = mongoose.model('Profesor',ProfesorSchema);
module.exports = Profesor;