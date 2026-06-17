const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes');

/**
 * Application Express configurée (middlewares + routes + gestion d'erreurs),
 * SANS connexion base ni écoute réseau. Séparée du bootstrap (server.js) pour
 * être importable telle quelle dans les tests (supertest).
 */
const app = express();

// --- Middlewares globaux ---
app.use(cors()); // API publique : CORS ouvert
app.use(express.json());

// --- Routes API ---
app.use('/api', apiRoutes);

// Sonde de santé simple
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// --- Gestion d'erreurs centralisée ---
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('❌ Erreur API :', err.message);
  res.status(500).json({ error: 'Erreur serveur interne' });
});

module.exports = app;
