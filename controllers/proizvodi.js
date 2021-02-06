const Proizvod = require('../models/Proizvod');
const Greska = require('../utils/greska');
const asyncHandler = require('../middleware/async');

exports.getProizvodi = asyncHandler(async (req, res, next) => {
  // console.log(req.query);

  let query;

  const queryTmp = { ...req.query };

  // Pravim query za svoje potrebe
  const removeFields = ['select', 'sort'];

  removeFields.forEach((param) => delete queryTmp[param]);

  let queryString = JSON.stringify(queryTmp);

  // Zbog toga sto baza radi sa $gt a ne sa gt, moramo da stavimo taj znak ispred
  queryString = queryString.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  query = Proizvod.find(JSON.parse(queryString));

  // Npr u query-u stavim select=naziv,kolicina  ---> vratice mi sveproizvode samo sa tim property-ima
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    //Select funkcija ocekuje ako se navode vise parametara da budu razdvojeni razmakom
    query = query.select(fields);
  }

  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    // Po default-u sortiraj mi proizvode po ceni od najkupljeg
    query = query.sort('-cena');
  }

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
