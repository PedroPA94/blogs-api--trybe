const express = require('express');
const { categoryController } = require('../controllers');
const auth = require('../middlewares/auth');
require('express-async-errors');

const router = express.Router();

router.use(auth);
router.post('/', categoryController.createCategory);
router.get('/', categoryController.getCategories);

module.exports = router;