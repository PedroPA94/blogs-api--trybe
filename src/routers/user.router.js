const express = require('express');
const { userController } = require('../controllers');
const auth = require('../middlewares/auth');
require('express-async-errors');

const router = express.Router();

router.post('/', userController.createUser);

router.use(auth);
router.get('/', userController.getUsers);

module.exports = router;