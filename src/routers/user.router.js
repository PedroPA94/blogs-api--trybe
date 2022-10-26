const express = require('express');
const { userController } = require('../controllers');
const auth = require('../middlewares/auth');
require('express-async-errors');

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', auth, (_req, _res) => console.log('09'));

module.exports = router;