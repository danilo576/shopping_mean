const TrzniCentar = require('../models/TrzniCentar');

exports.getTrzniCentri = async (req, res, next) => {
  try {
    const centri = await TrzniCentar.find();
    res.status(200).json({
      success: true,
      brojCentara: centri.length,
      data: centri,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
exports.getTrzniCentar = async (req, res, next) => {
  try {
    const centar = await TrzniCentar.findById(req.params.id);
    if (!centar) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({
      succes: true,
      data: centar,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
exports.createTrzniCentar = async (req, res, next) => {
  try {
    const centar = await TrzniCentar.create(req.body);
    res.status(201).json({
      success: true,
      data: centar,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
exports.updateTrzniCentar = async (req, res, next) => {
  try {
    const centar = await TrzniCentar.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!centar) {
      return res.status(400).json({ succes: false });
    }
    res.status(200).json({ success: true, data: centar });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
exports.deleteTrzniCentar = async (req, res, next) => {
  try {
    const centar = await TrzniCentar.findByIdAndDelete(req.params.id);
    if (!centar) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
