const mongoose = require('mongoose');

/**
 * Établit la connexion à MongoDB à partir de l'URI fournie en variable
 * d'environnement (MONGO_URI). Coupe le process si la connexion échoue,
 * car l'API ne peut rien servir sans base.
 */
async function connectDB(uri) {
  if (!uri) {
    throw new Error('MONGO_URI manquant : définis-le dans backend/.env');
  }

  await mongoose.connect(uri);
  console.log('✅ MongoDB connecté');
  return mongoose.connection;
}

module.exports = connectDB;
