const mongoose = require('mongoose');

/**
 * Registre des outils du site affichés sur la page d'accueil.
 * Un outil « available: false » apparaît en carte « Bientôt disponible ».
 * Le champ « slug » sert d'identifiant stable et d'URL de la feature Angular.
 */
const toolSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    icon: { type: String, default: 'build' }, // nom d'icône Material
    route: { type: String, default: '' }, // route Angular si disponible
    available: { type: Boolean, default: false },
    order: { type: Number, default: 0 }, // ordre d'affichage des cartes
  },
  { timestamps: true }
);

module.exports = mongoose.model('Tool', toolSchema);
