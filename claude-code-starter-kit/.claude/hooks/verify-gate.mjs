#!/usr/bin/env node
/**
 * Hook Stop — porte de vérification.
 *
 * À chaque fin de tour, vérifie qu'aucune édition de code ne reste sans commande
 * de vérification postérieure. Si c'est le cas, BLOQUE la clôture et renvoie à
 * Claude Code la consigne de lancer la vérification. But : faire respecter par
 * l'outil — et non par la vigilance de l'assistant — le principe « ne jamais
 * affirmer 'c'est fait' sans avoir vérifié ». Cf. CLAUDE.md / DECISIONS.md.
 *
 * Pendant Stop du hook PostToolUse summarize-change.mjs : l'un montre chaque
 * changement, l'autre garantit qu'il a été vérifié.
 *
 * Signal objectif (pas d'analyse du langage naturel) : on repère dans le
 * transcript la dernière exécution de la commande de vérification, puis les
 * fichiers de code édités APRÈS elle. S'il en reste, on bloque.
 *
 * Garde anti-boucle : si `stop_hook_active` est vrai, on laisse passer.
 * Toute erreur ⇒ exit 0 (la clôture passe) : un hook ne doit jamais bloquer le
 * travail sur son propre bug.
 *
 * ─── À ADAPTER à ton projet ─────────────────────────────────────────────────
 *  • CHECK_COMMAND : la commande qui prouve que le code tient (lint + tests/build).
 *  • CHECK_PATTERN : comment la reconnaître dans le transcript.
 *  • IGNORED       : préfixes/extensions à NE PAS garder (docs, config, .claude…).
 * Pour un monorepo multi-dossiers, remplace la commande unique par une liste
 * { dir, command } et calcule les dossiers édités, comme dans le hook équivalent
 * du projet CraftCode dont ce kit est issu.
 * ────────────────────────────────────────────────────────────────────────────
 */
import { readFileSync } from 'node:fs';
import { relative } from 'node:path';

const ROOT = process.env.CLAUDE_PROJECT_DIR || process.cwd();

const CHECK_COMMAND = 'npm run check'; // À ADAPTER
const CHECK_PATTERN = /npm run check/; // À ADAPTER

/** Chemins relatifs à NE PAS soumettre à la porte (édition libre). À ADAPTER. */
const IGNORED = ['.claude/', 'docs/'];
const IGNORED_EXT = ['.md', '.txt'];

const EDIT_TOOLS = new Set(['Edit', 'Write', 'MultiEdit']);

function readStdin() {
  try {
    return readFileSync(0, 'utf8');
  } catch {
    return '';
  }
}

/** Le fichier doit-il déclencher la porte ? (false pour docs/config ignorés). */
function isGated(filePath) {
  if (typeof filePath !== 'string') return false;
  const rel = relative(ROOT, filePath);
  if (rel.startsWith('..')) return false; // hors du dépôt
  if (IGNORED.some((p) => rel.startsWith(p))) return false;
  if (IGNORED_EXT.some((ext) => rel.endsWith(ext))) return false;
  return true;
}

/** Reste-t-il des fichiers de code édités après le dernier check ? */
function hasUncheckedEdits(transcriptPath) {
  const raw = readFileSync(transcriptPath, 'utf8');
  let pending = false;

  for (const line of raw.split('\n')) {
    if (!line.trim()) continue;
    let entry;
    try {
      entry = JSON.parse(line);
    } catch {
      continue; // ligne illisible : on ignore
    }

    const content = entry?.message?.content;
    if (!Array.isArray(content)) continue;

    for (const block of content) {
      if (block?.type !== 'tool_use') continue;

      if (EDIT_TOOLS.has(block.name)) {
        if (isGated(block?.input?.file_path)) pending = true;
      } else if (block.name === 'Bash' && CHECK_PATTERN.test(block?.input?.command ?? '')) {
        pending = false; // un check remet les compteurs à zéro
      }
    }
  }

  return pending;
}

function main() {
  let payload;
  try {
    payload = JSON.parse(readStdin());
  } catch {
    process.exit(0);
  }

  if (payload?.stop_hook_active) process.exit(0); // anti-boucle

  const transcriptPath = payload?.transcript_path;
  if (!transcriptPath) process.exit(0);

  let pending;
  try {
    pending = hasUncheckedEdits(transcriptPath);
  } catch {
    process.exit(0); // transcript illisible : on laisse passer
  }

  if (!pending) process.exit(0);

  const reason =
    `Porte de vérification : du code a été modifié sans vérification depuis. ` +
    `Avant de clore, lance \`${CHECK_COMMAND}\` et colle sa sortie. ` +
    `Si un test échoue, dis-le plutôt que d'affirmer que c'est fait.`;

  process.stdout.write(JSON.stringify({ decision: 'block', reason }));
  process.exit(0);
}

main();
