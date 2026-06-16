const mongoose = require('mongoose');

/**
 * Item de la checklist « Code Review ».
 * Regroupé par « category » côté frontend. « order » fixe l'ordre d'affichage
 * à l'intérieur d'une catégorie. L'état coché n'est PAS stocké ici :
 * il vit dans le localStorage du navigateur.
 */
const checklistItemSchema = new mongoose.Schema(
  {
    category: { type: String, required: true, trim: true },
    label: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ChecklistItem', checklistItemSchema);
