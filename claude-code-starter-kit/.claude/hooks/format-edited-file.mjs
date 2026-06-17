#!/usr/bin/env node
/**
 * Hook PostToolUse (Edit|Write|MultiEdit) — formatage automatique.
 *
 * Après chaque édition de fichier par Claude Code, formate le fichier touché
 * avec le Prettier le plus proche (remonte l'arborescence depuis le fichier
 * jusqu'à trouver node_modules/.bin/prettier). Générique : aucun chemin de
 * projet en dur. Adapte le formateur (eslint --fix, gofmt, black…) à ta stack.
 *
 * Ne lève jamais d'exception : un hook qui plante ne doit pas bloquer le travail.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, parse } from 'node:path';

const PRETTIER_EXT = /\.(ts|js|mjs|cjs|jsx|tsx|html|scss|css|json|md|yml|yaml)$/;

function readStdin() {
  try {
    return readFileSync(0, 'utf8');
  } catch {
    return '';
  }
}

/** Cherche node_modules/.bin/prettier en remontant depuis le fichier édité. */
function findPrettierBin(filePath) {
  let dir = dirname(filePath);
  const { root } = parse(dir);
  while (true) {
    const bin = join(dir, 'node_modules', '.bin', 'prettier');
    if (existsSync(bin)) return bin;
    if (dir === root) return null;
    dir = dirname(dir);
  }
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

  const bin = findPrettierBin(filePath);
  if (bin) {
    try {
      execFileSync(bin, ['--write', '--ignore-unknown', filePath], {
        stdio: 'ignore',
      });
    } catch {
      /* fichier ignoré par .prettierignore ou non parsable : on n'échoue pas */
    }
  }

  process.exit(0);
}

main();
