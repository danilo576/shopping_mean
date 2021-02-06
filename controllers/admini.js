const Admin = require('../models/Admin');
const Greska = require('../utils/greska');
const asyncHandler = require('../middleware/async');

exports.createAdmin = asyncHandler(async (req, res, next) => {
  const admin = await Admin.create(req.body);
  res.status(201).json({
    success: true,
    data: admin,
  });
});

exports.getAllAdmins = asyncHandler(async (req, res, next) => {
  const admini = await Admin.find();
  res.status(200).json({
    success: true,
    data: admini,
  });
});

exports.getAdmin = asyncHandler(async (req, res, next) => {
  const admin = await Admin.findById(req.params.id);
  if (!admin) {
    return next(new Greska(`Ne postoji Admin sa id: ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
    data: admin,
  });
});

exports.deleteAdmin = asyncHandler(async (req, res, next) => {
  const admin = await Admin.findByIdAndDelete(req.params.id);
  if (!admin) {
    return next(new Greska(`Ne postoji Admin sa id: ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
    data: {},
  });
});
