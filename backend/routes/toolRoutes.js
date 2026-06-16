const express = require('express');
const { getTools } = require('../controllers/toolController');

const router = express.Router();

// GET /api/tools → liste des outils du site
router.get('/', getTools);

module.exports = router;
