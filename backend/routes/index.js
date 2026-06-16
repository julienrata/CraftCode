const express = require('express');
const toolRoutes = require('./toolRoutes');
const codeReviewRoutes = require('./codeReviewRoutes');

const router = express.Router();

// Point de montage central de l'API.
// Pour ajouter un nouvel outil (ex: SOLID, GoF), il suffit de créer
// son fichier de routes et de le monter ici — aucun autre refactor.
router.use('/tools', toolRoutes);
router.use('/code-review', codeReviewRoutes);

module.exports = router;
