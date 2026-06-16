require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Tool = require('../models/Tool');
const ChecklistItem = require('../models/ChecklistItem');
const { tools, checklist } = require('./data');

/**
 * Peuple MongoDB : registre des outils ET items de la checklist code review.
 * Idempotent : vide les collections avant insertion pour pouvoir relancer
 * « npm run seed » sans accumuler de doublons.
 */
async function seed() {
  try {
    await connectDB(process.env.MONGO_URI);

    await Promise.all([Tool.deleteMany({}), ChecklistItem.deleteMany({})]);
    console.log('🧹 Collections vidées');

    const [insertedTools, insertedItems] = await Promise.all([
      Tool.insertMany(tools),
      ChecklistItem.insertMany(checklist),
    ]);

    console.log(`✅ ${insertedTools.length} outils insérés`);
    console.log(`✅ ${insertedItems.length} items de checklist insérés`);
  } catch (err) {
    console.error('❌ Échec du seed :', err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
