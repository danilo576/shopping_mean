const express = require('express');
const {
  getTrzniCentri,
  getTrzniCentar,
  createTrzniCentar,
  updateTrzniCentar,
  deleteTrzniCentar,
} = require('../controllers/trzniCentri');
const router = express.Router();

// Sve rute ovde ce imate prefix http://localhost:5000/api/trzniCentri

router.route('/').get(getTrzniCentri).post(createTrzniCentar);
router
  .route('/:id')
  .get(getTrzniCentar)
  .put(updateTrzniCentar)
  .delete(deleteTrzniCentar);

module.exports = router;
