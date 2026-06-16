const Tool = require('../models/Tool');

/**
 * GET /api/tools
 * Renvoie le registre des outils, trié par ordre d'affichage.
 */
async function getTools(req, res, next) {
  try {
    const tools = await Tool.find().sort({ order: 1 }).lean();
    res.json(tools);
  } catch (err) {
    next(err);
  }
}

module.exports = { getTools };
