const express = require('express');
const { authController } = require('../controllers');
require('express-async-errors');

const router = express.Router();

router.post('/', authController.validateLogin);

module.exports = router;