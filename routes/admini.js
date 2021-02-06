const express = require('express');
const router = express.Router();
const {
  createAdmin,
  getAllAdmins,
  getAdmin,
  deleteAdmin,
} = require('../controllers/admini');

router.route('/').post(createAdmin).get(getAllAdmins);

router.route('/:id').get(getAdmin).delete(deleteAdmin);

module.exports = router;
