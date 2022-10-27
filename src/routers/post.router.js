const express = require('express');
const { postController } = require('../controllers');
const auth = require('../middlewares/auth');
require('express-async-errors');

const router = express.Router();

router.use(auth);
router.get('/search', postController.queryPost);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.get('/', postController.getPosts);
router.post('/', postController.createPost);

module.exports = router;