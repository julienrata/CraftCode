require('dotenv').config();
const connectDB = require('./config/db');
const app = require('./app');

const PORT = process.env.PORT || 3000;

// --- Démarrage : on connecte la base avant d'écouter ---
connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`🚀 API en écoute sur http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error('❌ Impossible de démarrer le serveur :', err.message);
    process.exit(1);
  });
