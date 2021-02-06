let RoditeljModel = require('../models/Roditelj');
let RoditeljController = {
  all: async (req, res) => {
    let sviRoditelji = await RoditeljModel.find();
    res.json(sviRoditelji);
  },
  create: async (req, res) => {
    let noviRoditelj = new RoditeljModel(req.body);
    let saved = await noviRoditelj.save();
    res.json(saved);
  },
  find: async (req, res) => {
    let found = await RoditeljModel.find({ Ime: req.params.Ime });
    res.json(found);
  },
  findById: async (req, res) => {
    let found = await RoditeljModel.find({ _id: req.params._id });
    res.json(found);
  },
  findByEmail: async (req, res) => {
    let found = await RoditeljModel.find({ Email: req.params.Email });
    res.json(found);
  },
  nadjiPrekoDeteta: async (req, res) => {
    let found = await RoditeljModel.find({ Deca: req.params.idDeteta });
    res.json(found);
  },
};

module.exports = RoditeljController;
