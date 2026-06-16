import { defineConfig } from 'vitest/config';

// `globals: true` expose describe/it/expect sans import — indispensable pour
// des fichiers de test en CommonJS (le projet est en `type: commonjs`).
export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
});
