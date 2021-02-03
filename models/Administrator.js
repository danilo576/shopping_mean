var mongoose = require("mongoose");
const { Schema } = mongoose;

const ZahtevPostSchema = new Schema({ 
    TipZahteva: String,
    Sadrzaj: String,
    Datum: String
})

const AdministratorSchema = new Schema({
    Ime: String,
    Prezime: String,
    Email: String,
    Zahtevi: [ZahtevPostSchema]
})

module.exports = mongoose.model('Administrator', AdministratorSchema);