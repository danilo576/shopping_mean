const Greska = require('../utils/greska');

const errorHandler = (err, req, res, next) => {
  // console.log(err);
  // console.log(err.name.magenta.bold.underline);
  let error_tmp = { ...err };
  //Ovo radim da bih uzeo poruku iz greske koju baca ako je pravilno formatiran ObjectId ali je rezultat null
  error_tmp.message = err.message;
  if (err.name === 'CastError') {
    const poruka = `Nije pronadjen resurs sa id: ${err.value}`;
    error_tmp = new Greska(poruka, 404);
  }
  // Ukoliko pokusam u bazu da kreiram po 2. put property koji je pre ovoga imao 'unique' vrednost
  // kod 11000 signalizira tu gresku
  if (err.code === 11000) {
    const poruka =
      'Vrednost unetog polja mora biti jedinstvena, u bazu vec postoji ta vrednost';
    error_tmp = new Greska(poruka, 400);
  }

  //Provaravamo da li je doslo do gresaka u validaciji
  if (err.name === 'ValidationError') {
    console.log(
      'Ovo su sva obavezna polja koja cuvam u Schema: '.green.bold.underline,
      Object.values(err.errors)[0].message
    );
    const poruka = Object.values(err.errors).map((gresku) => gresku.message);
    error_tmp = new Greska(poruka, 400);
  }
  res.status(error_tmp.statusniKod || 500).json({
    success: false,
    error: error_tmp.message || 'Server Error',
  });
};

module.exports = errorHandler;
