exports.getTrzniCentri = (req, res, next) => {
  res.status(200).json({ succes: true, msg: 'Prikazujem sve trzne centre' });
};
exports.getTrzniCentar = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Prikazujem trzni centar sa id: ${req.params.id}`,
  });
};
exports.createTrzniCentar = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Kreiram trzni centar' });
};
exports.updateTrzniCentar = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Update trzni centar sa id: ${req.params.id}`,
  });
};
exports.deleteTrzniCentar = (req, res, next) => {
  res.status(200).json({
    succes: true,
    msg: `Brisem trzni centar sa id: ${req.params.id}`,
  });
};
