// describe/it/expect sont globaux (cf. vitest.config.mjs → globals: true).
const { tools, checklist } = require('./data');

const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

describe('seed: tools', () => {
  it('chaque outil porte les champs requis', () => {
    for (const t of tools) {
      expect(typeof t.slug).toBe('string');
      expect(typeof t.name).toBe('string');
      expect(typeof t.description).toBe('string');
      expect(typeof t.icon).toBe('string');
      expect(typeof t.route).toBe('string');
      expect(typeof t.available).toBe('boolean');
      expect(typeof t.order).toBe('number');
    }
  });

  it('les slugs sont en kebab-case et uniques', () => {
    const slugs = tools.map((t) => t.slug);
    for (const slug of slugs) expect(slug).toMatch(KEBAB);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('les routes commencent par "/"', () => {
    for (const t of tools) expect(t.route.startsWith('/')).toBe(true);
  });

  it('les ordres d’affichage sont uniques', () => {
    const orders = tools.map((t) => t.order);
    expect(new Set(orders).size).toBe(orders.length);
  });
});

describe('seed: checklist', () => {
  it('chaque item porte les champs requis', () => {
    for (const item of checklist) {
      expect(typeof item.category).toBe('string');
      expect(item.label.length).toBeGreaterThan(0);
      expect(item.description.length).toBeGreaterThan(0);
      expect(typeof item.order).toBe('number');
    }
  });

  it('l’ordre est unique à l’intérieur d’une catégorie', () => {
    const byCategory = {};
    for (const item of checklist) {
      (byCategory[item.category] ??= []).push(item.order);
    }
    for (const [category, orders] of Object.entries(byCategory)) {
      expect(new Set(orders).size, `doublon d'ordre dans « ${category} »`).toBe(
        orders.length
      );
    }
  });
});
