const express = require('express');
const { getChecklist } = require('../controllers/codeReviewController');

const router = express.Router();

// GET /api/code-review → tous les items de la checklist code review
router.get('/', getChecklist);

module.exports = router;
