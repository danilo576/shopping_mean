const Proizvod = require('../models/Proizvod');
const Greska = require('../utils/greska');
const asyncHandler = require('../middleware/async');

exports.getProizvodi = asyncHandler(async (req, res, next) => {
  console.log(req.query);
  //Ako nista ne prosledimo kroz query onda vraca sve prozvode
  let query;
  let queryString = JSON.stringify(req.query);

  // Zbog toga sto baza radi sa $gt a ne sa gt, moramo da stavimo taj znak ispred
  queryString = queryString.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  query = Proizvod.find(JSON.parse(queryString));

  const proizvodi = await query;

  res.status(200).json({
    success: true,
    data: proizvodi,
  });
});

exports.getProizvod = asyncHandler(async (req, res, next) => {
  const proizvod = await Proizvod.findById(req.params.id);
  if (!proizvod) {
    return next(
      new Greska(`Nije pronadjen Proizvod sa id: ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: proizvod,
  });
});

exports.updateProizvod = asyncHandler(async (req, res, next) => {
  const proizvod = await Proizvod.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!proizvod)
    return next(
      new Greska(`Nije pronadjen Proizvod sa id: ${req.params.id}`, 404)
    );
  res.status(200).json({
    success: true,
    data: proizvod,
  });
});

exports.createProizvod = asyncHandler(async (req, res, next) => {
  const proizvod = await Proizvod.create(req.body);
  res.status(201).json({
    success: true,
    data: proizvod,
  });
});

exports.deleteProizvod = asyncHandler(async (req, res, next) => {
  const proizvod = await Proizvod.findByIdAndDelete(req.params.id);
  if (!proizvod)
    return next(
      new Greska(`Nije pronadjen Proizvod sa id: ${req.params.id}`, 404)
    );
  res.status(200).json({
    success: true,
    data: {},
  });
});
