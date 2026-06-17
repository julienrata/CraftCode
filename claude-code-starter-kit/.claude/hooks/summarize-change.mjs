#!/usr/bin/env node
/**
 * Hook PostToolUse (Edit|Write|MultiEdit) — résumé visible des changements.
 *
 * Après chaque modification de fichier par Claude Code, affiche un résumé
 * lisible : outil utilisé, fichier touché, lignes +/− par rapport au dernier
 * commit. But : que le développeur VOIE ce que l'assistant opère, sans dépendre
 * de sa vigilance. Générique : la racine du dépôt vient de $CLAUDE_PROJECT_DIR
 * (repli sur le répertoire courant).
 *
 * Le message remonte via le champ `systemMessage` de la sortie JSON, affiché à
 * l'utilisateur. Ne lève jamais d'exception : un hook ne doit pas bloquer.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { relative } from 'node:path';

const ROOT = process.env.CLAUDE_PROJECT_DIR || process.cwd();

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
