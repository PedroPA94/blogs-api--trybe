const express = require('express');
const { postController } = require('../controllers');
const auth = require('../middlewares/auth');
require('express-async-errors');

const router = express.Router();

router.use(auth);
router.post('/', postController.createPost);

module.exports = router;