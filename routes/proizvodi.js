const express = require('express');
const {
  getProizvodi,
  getProizvod,
  createProizvod,
  updateProizvod,
  deleteProizvod,
} = require('../controllers/proizvodi');
const router = express.Router();

// Sve rute ce imati prefix http://localhost:5000/api/proizvodi

router.route('/').get(getProizvodi).post(createProizvod);

router
  .route('/:id')
  .get(getProizvod)
  .put(updateProizvod)
  .delete(deleteProizvod);

module.exports = router;
