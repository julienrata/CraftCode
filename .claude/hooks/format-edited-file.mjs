#!/usr/bin/env node
/**
 * Hook PostToolUse (Edit|Write|MultiEdit) — CraftCode.
 *
 *  1. Formate automatiquement le fichier édité avec le Prettier du bon package
 *     (frontend/ ou backend/), en s'appuyant sur la config racine `.prettierrc.json`.
 *  2. Garde-fou design system : signale (sans bloquer dur) toute couleur hexadécimale
 *     écrite dans un `.scss` de composant — la source unique des couleurs est
 *     `frontend/src/styles.scss` (tokens `--cc-*`). Cf. DESIGN-SYSTEM.md.
 *
 * Ne lève jamais d'exception : un hook qui plante ne doit pas bloquer le travail.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const PRETTIER_EXT = /\.(ts|js|mjs|cjs|html|scss|css|json|md)$/;
const ROOT = '/Users/julien/Dev/CraftCode';

function readStdin() {
  try {
    return readFileSync(0, 'utf8');
  } catch {
    return '';
  }
}

function prettierBinFor(filePath) {
  const pkg = filePath.includes('/frontend/')
    ? 'frontend'
    : filePath.includes('/backend/')
      ? 'backend'
      : null;
  if (!pkg) return null;
  const bin = join(ROOT, pkg, 'node_modules', '.bin', 'prettier');
  return existsSync(bin) ? bin : null;
}

function main() {
  let payload;
  try {
    payload = JSON.parse(readStdin());
  } catch {
    process.exit(0);
  }

  const filePath = payload?.tool_input?.file_path;
  if (!filePath || !PRETTIER_EXT.test(filePath)) process.exit(0);

  // 1. Formatage
  const bin = prettierBinFor(filePath);
  if (bin) {
    try {
      execFileSync(bin, ['--write', '--ignore-unknown', filePath], {
        stdio: 'ignore',
      });
    } catch {
      /* fichier ignoré par .prettierignore ou non parsable : on n'échoue pas */
    }
  }

  // 2. Garde-fou couleurs (avertissement non bloquant)
  const isComponentScss =
    /\/frontend\/src\/.*\.scss$/.test(filePath) &&
    !filePath.endsWith('/styles.scss');
  if (isComponentScss && existsSync(filePath)) {
    const content = readFileSync(filePath, 'utf8');
    if (/#[0-9a-fA-F]{3,8}\b/.test(content)) {
      console.error(
        `⚠️  ${filePath} contient une couleur hexadécimale. ` +
          `Utilise un token --cc-* (cf. DESIGN-SYSTEM.md), jamais une valeur en dur.`
      );
      process.exit(2); // remonte le message à Claude sans interrompre la session
    }
  }

  process.exit(0);
}

main();
