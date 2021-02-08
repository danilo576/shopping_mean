const path = require('path');
const Greska = require('../utils/greska');
//Ovaj middleware mi omogucuje da brisem try/catch strukturu i celu async metodu wrap-ujem unutar ove funkcije
const asyncHandler = require('../middleware/async');
const TrzniCentar = require('../models/TrzniCentar');

exports.getTrzniCentri = asyncHandler(async (req, res, next) => {
  const centri = await TrzniCentar.find();
  res.status(200).json({
    success: true,
    brojCentara: centri.length,
    data: centri,
  });
});

exports.getTrzniCentar = asyncHandler(async (req, res, next) => {
  const centar = await TrzniCentar.findById(req.params.id);
  if (!centar) {
    return next(
      new Greska(`Nije pronadjen Trzni Centar sa id: ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    succes: true,
    data: centar,
  });
});

exports.createTrzniCentar = asyncHandler(async (req, res, next) => {
  const centar = await TrzniCentar.create(req.body);
  res.status(201).json({
    success: true,
    data: centar,
  });
});

exports.updateTrzniCentar = asyncHandler(async (req, res, next) => {
  const centar = await TrzniCentar.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!centar) {
    return next(
      new Greska(`Nije pronadjen Trzni Centar sa id: ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: centar });
});

exports.deleteTrzniCentar = asyncHandler(async (req, res, next) => {
  const centar = await TrzniCentar.findByIdAndDelete(req.params.id);
  if (!centar) {
    return next(
      new Greska(`Nije pronadjen Trzni Centar sa id: ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});

exports.uploadSlika = asyncHandler(async (req, res, next) => {
  const centar = await TrzniCentar.findById(req.params.id);
  if (!centar) {
    return next(
      new Greska(`Nije pronadjen Trzni Centar sa id: ${req.params.id}`, 404)
    );
  }

  if (!req.files) {
    return next(new Greska(`Molimo vas da unesete fajl!`, 400));
  }
  // console.log(req.files.file);

  const file = req.files.file;

  //Proveravamo da li je fajl zapravo slika --> mimetype mora pocinjati sa 'image/ekstenzija slike'
  if (!file.mimetype.startsWith('image')) {
    return next(new Greska(`Fajl koji ste uneli ne predstavlja sliku!`, 400));
  }

  // Da ne bi doslo do preklapanja slika ukoliko imaju isti naziv
  // path je node-core mudule i njegova parse funkcija ce da mi nadoveze ekstenziju uploadovane slike na novi naziv slike
  file.name = `slika_${centar._id}${path.parse(file.name).ext}`;
  // console.log(file.name);

  //Zovem mv funkciju i navodim putanju direktorijuma gde zelim da mi se smesti slika
  file.mv(`${process.env.PUTANJA_SLIKA}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new Greska('Problem sa upload-ovanjem slike...', 500));
    }

    await TrzniCentar.findByIdAndUpdate(req.params.id, { slika: file.name });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
