require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const apiRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middlewares globaux ---
app.use(cors()); // API publique : CORS ouvert
app.use(express.json());

// --- Routes API ---
app.use('/api', apiRoutes);

// Sonde de santé simple
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// --- Gestion d'erreurs centralisée ---
app.use((err, req, res, next) => {
  console.error('❌ Erreur API :', err.message);
  res.status(500).json({ error: 'Erreur serveur interne' });
});

// --- Démarrage : on connecte la base avant d'écouter ---
connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 API en écoute sur http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('❌ Impossible de démarrer le serveur :', err.message);
    process.exit(1);
  });
