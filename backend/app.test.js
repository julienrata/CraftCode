// Tests d'intégration de l'API. describe/it/expect/beforeAll/afterAll sont
// globaux (cf. vitest.config.mjs → globals: true).
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = require('./app');
const Tool = require('./models/Tool');

let mongod;

beforeAll(async () => {
  // Mongo éphémère en mémoire : aucun service externe requis.
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());
}, 60_000);

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe('GET /health', () => {
  it('répond 200 { status: "ok" }', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('GET /api/tools', () => {
  it('renvoie les outils triés par order croissant', async () => {
    await Tool.deleteMany({});
    await Tool.insertMany([
      { slug: 'b-tool', name: 'B', description: 'd', route: '/b', order: 2 },
      { slug: 'a-tool', name: 'A', description: 'd', route: '/a', order: 1 },
    ]);

    const res = await request(app).get('/api/tools');

    expect(res.status).toBe(200);
    expect(res.body.map((t) => t.slug)).toEqual(['a-tool', 'b-tool']);
  });

  it('renvoie un tableau vide quand il n’y a aucun outil', async () => {
    await Tool.deleteMany({});
    const res = await request(app).get('/api/tools');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});
