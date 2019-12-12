const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.get('/:id', userController.getUserById);
router.get('/:id/articles', userController.getArticlesByUser);
router.delete('/:id', userController.deleteById);

module.exports = router;