const express = require('express');
const { userController } = require('../controllers');
const auth = require('../middlewares/auth');
require('express-async-errors');

const router = express.Router();

router.post('/', userController.createUser);

router.use(auth);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.delete('/me', userController.deleteUser);

module.exports = router;