const ChecklistItem = require('../models/ChecklistItem');

/**
 * GET /api/code-review
 * Renvoie tous les items de la checklist code review, triés par
 * catégorie puis par ordre d'affichage. Le regroupement par catégorie
 * est fait côté frontend.
 */
async function getChecklist(req, res, next) {
  try {
    const items = await ChecklistItem.find().sort({ category: 1, order: 1 }).lean();
    res.json(items);
  } catch (err) {
    next(err);
  }
}

module.exports = { getChecklist };
