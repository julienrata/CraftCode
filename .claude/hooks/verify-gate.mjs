#!/usr/bin/env node
/**
 * Hook Stop — CraftCode : porte de vérification.
 *
 * À chaque fin de tour, vérifie qu'aucune édition de code (frontend/ ou backend/)
 * ne reste sans `npm run check` postérieur. Si c'est le cas, BLOQUE la clôture et
 * renvoie à Claude la consigne de lancer le check du bon dossier. But : faire
 * respecter par l'outil — et non par la vigilance de l'assistant — le principe
 * « ne jamais affirmer 'c'est fait' sans avoir vérifié ». Cf. DECISIONS.md.
 *
 * Pendant Stop du hook PostToolUse summarize-change.mjs : l'un montre chaque
 * changement, l'autre garantit qu'il a été vérifié.
 *
 * Signal objectif (pas d'analyse du langage naturel) : on repère dans le
 * transcript la dernière exécution de `npm run check`, puis les dossiers de code
 * édités APRÈS elle. S'il en reste, on bloque.
 *
 * Garde anti-boucle : si `stop_hook_active` est vrai (Claude poursuit déjà à
 * cause d'un blocage de ce hook), on laisse passer.
 *
 * Ne lève jamais d'exception ni de code d'erreur : un hook qui plante ne doit
 * jamais interrompre le travail (toute erreur ⇒ exit 0, la clôture passe).
 */
import { readFileSync } from 'node:fs';

const ROOT = '/Users/julien/Dev/CraftCode';

/** Dossiers de code soumis à la porte, avec la commande de vérification associée. */
const GATED = [
  { dir: 'frontend', command: 'cd frontend && npm run check' },
  { dir: 'backend', command: 'cd backend && npm run check' },
];

const EDIT_TOOLS = new Set(['Edit', 'Write', 'MultiEdit']);

function readStdin() {
  try {
    return readFileSync(0, 'utf8');
  } catch {
    return '';
  }
}

/** Dossier gardé (frontend|backend) d'un chemin de fichier, ou null. */
function gatedDirOf(filePath) {
  if (typeof filePath !== 'string') return null;
  // Normalise vers un chemin relatif à la racine du projet.
  const rel = filePath.startsWith(ROOT + '/') ? filePath.slice(ROOT.length + 1) : filePath;
  const match = GATED.find((g) => rel === g.dir || rel.startsWith(g.dir + '/'));
  return match ? match.dir : null;
}

/** Une commande Bash est-elle un `npm run check` ? */
function isCheckCommand(command) {
  return typeof command === 'string' && /npm run check/.test(command);
}

/**
 * Parcourt le transcript (JSONL) dans l'ordre et renvoie l'ensemble des dossiers
 * de code édités APRÈS le dernier `npm run check` (ou depuis le début si aucun).
 */
function dirsEditedSinceLastCheck(transcriptPath) {
  const raw = readFileSync(transcriptPath, 'utf8');
  const pending = new Set();

  for (const line of raw.split('\n')) {
    if (!line.trim()) continue;
    let entry;
    try {
      entry = JSON.parse(line);
    } catch {
      continue; // ligne illisible : on ignore, on ne bloque pas pour autant
    }

    const content = entry?.message?.content;
    if (!Array.isArray(content)) continue;

    for (const block of content) {
      if (block?.type !== 'tool_use') continue;

      if (EDIT_TOOLS.has(block.name)) {
        const dir = gatedDirOf(block?.input?.file_path);
        if (dir) pending.add(dir);
      } else if (block.name === 'Bash' && isCheckCommand(block?.input?.command)) {
        // Un check est propre à un dossier (`cd frontend && npm run check`) : il ne
        // dédouane que le(s) dossier(s) qu'il cible. S'il n'en cible aucun
        // explicitement, on considère qu'il couvre tout (best-effort, évite de
        // bloquer à tort).
        const command = block.input.command;
        const targeted = GATED.filter((g) => command.includes(g.dir));
        if (targeted.length === 0) pending.clear();
        else targeted.forEach((g) => pending.delete(g.dir));
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

  // Anti-boucle : ne pas re-bloquer une clôture déjà relancée par ce hook.
  if (payload?.stop_hook_active) process.exit(0);

  const transcriptPath = payload?.transcript_path;
  if (!transcriptPath) process.exit(0);

  let pending;
  try {
    pending = dirsEditedSinceLastCheck(transcriptPath);
  } catch {
    process.exit(0); // transcript illisible : on laisse passer
  }

  if (pending.size === 0) process.exit(0);

  const commands = GATED.filter((g) => pending.has(g.dir))
    .map((g) => `  ${g.command}`)
    .join('\n');
  const zones = [...pending].join(' et ');

  const reason =
    `Porte de vérification : des fichiers de ${zones} ont été modifiés sans ` +
    `\`npm run check\` depuis. Avant de clore, lance la vérification du ou des ` +
    `dossiers touchés et colle sa sortie :\n${commands}\n` +
    `Si un test échoue, dis-le plutôt que d'affirmer que c'est fait.`;

  process.stdout.write(JSON.stringify({ decision: 'block', reason }));
  process.exit(0);
}

main();
