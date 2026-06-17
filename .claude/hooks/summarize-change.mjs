#!/usr/bin/env node
/**
 * Hook PostToolUse (Edit|Write|MultiEdit) — CraftCode.
 *
 * Affiche automatiquement, après chaque modification de fichier par Claude, un
 * résumé lisible du changement : outil utilisé, fichier touché, lignes +/− par
 * rapport au dernier commit. But : que le développeur VOIE clairement ce que
 * Claude opère, sans dépendre de la vigilance de l'assistant. Cf. DECISIONS.md.
 *
 * Le message est remonté via le champ `systemMessage` de la sortie JSON du hook,
 * qui est affiché à l'utilisateur (et non seulement injecté dans le contexte).
 *
 * Ne lève jamais d'exception ni de code d'erreur : un hook qui plante ou qui
 * bloque ne doit jamais interrompre le travail.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { relative } from 'node:path';

const ROOT = '/Users/julien/Dev/CraftCode';

function readStdin() {
  try {
    return readFileSync(0, 'utf8');
  } catch {
    return '';
  }
}

function git(args) {
  try {
    return execFileSync('git', ['-C', ROOT, ...args], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    return '';
  }
}

/** Renvoie { added, removed, statut } pour un fichier, ou null si rien à dire. */
function diffStat(filePath) {
  const rel = relative(ROOT, filePath);

  // Fichier non suivi (nouvellement créé) : `git diff` ne le voit pas.
  const status = git(['status', '--porcelain', '--', rel]);
  if (status.startsWith('??')) {
    let lines = 0;
    try {
      lines = readFileSync(filePath, 'utf8').split('\n').length;
    } catch {
      /* illisible : on laisse 0 */
    }
    return { added: lines, removed: 0, statut: 'nouveau fichier' };
  }

  // Fichier suivi : delta cumulé par rapport au dernier commit.
  const numstat = git(['diff', 'HEAD', '--numstat', '--', rel]);
  if (!numstat) return null; // aucun changement vs HEAD (ex. reformatage idempotent)

  const [added, removed] = numstat.split('\n')[0].split('\t');
  return {
    added: added === '-' ? '?' : Number(added),
    removed: removed === '-' ? '?' : Number(removed),
    statut: 'vs dernier commit',
  };
}

function main() {
  let payload;
  try {
    payload = JSON.parse(readStdin());
  } catch {
    process.exit(0);
  }

  const filePath = payload?.tool_input?.file_path;
  if (!filePath) process.exit(0);

  const tool = payload?.tool_name ?? 'Edit';
  const rel = relative(ROOT, filePath);
  const stat = diffStat(filePath);

  const summary = stat
    ? `📝 ${tool} · ${rel} · +${stat.added} −${stat.removed} (${stat.statut})`
    : `📝 ${tool} · ${rel} · aucun changement net (vs dernier commit)`;

  process.stdout.write(JSON.stringify({ systemMessage: summary }));
  process.exit(0);
}

main();
