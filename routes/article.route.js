const express = require('express');
const router = express.Router();

const articleController = require('../controllers/article');

router.post('/', articleController.createArticle);
router.put('/:id', articleController.updateArticle);
router.get('/', articleController.getByFilter);
router.delete('/:id', articleController.deleteArticle);

module.exports = router;