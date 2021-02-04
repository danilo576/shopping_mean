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
