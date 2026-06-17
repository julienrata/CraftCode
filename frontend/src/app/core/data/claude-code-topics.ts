import { ClaudeCodeTopic } from '../models/claude-code-topic.model';

/**
 * Source unique du contenu pédagogique « Mettre en place Claude Code dans un
 * projet ». Quatre sujets, chacun avec un `slug` stable qui sert de paramètre
 * de route (page de détail `/claude-code-setup/:sujet`).
 *
 * Consommé par le hub (claude-code-setup) et les pages de détail
 * (claude-code-setup-detail). Les exemples de code sont illustratifs : ils
 * montrent une forme à imiter, ils ne sont jamais exécutés.
 */
export const CLAUDE_CODE_TOPICS: ClaudeCodeTopic[] = [
  {
    slug: 'fichiers-markdown',
    icon: 'description',
    titre: 'Les fichiers markdown',
    accroche:
      'Le fichier CLAUDE.md est la mémoire du projet : il dit à Claude Code comment travailler ici.',
    definition:
      'Claude Code lit automatiquement le CLAUDE.md à la racine au démarrage. C’est le minimum vital : un document court qui décrit le projet, le style de travail attendu et les commandes de vérification. On l’enrichit par des fichiers thématiques importés via la syntaxe « @ ».',
    pourquoi: [
      'Contexte partagé : l’assistant connaît la stack, l’arborescence et les conventions sans qu’on les répète à chaque session.',
      'Cohérence : les règles de nommage, de style et de commit sont au même endroit, versionnées avec le code.',
      'Découpage : un CLAUDE.md court qui « @importe » des guides spécialisés reste lisible et facile à faire évoluer.',
      'Onboarding : un nouvel arrivant — humain ou assistant — lit les mêmes documents.',
    ],
    exemples: [
      {
        legende: 'Squelette minimal d’un CLAUDE.md à la racine',
        code: `# Mon projet

Frontend dans \`web/\` · backend dans \`api/\`. Base PostgreSQL.

## Documentation
- @ARCHITECTURE.md — carte du projet et flux de données.
- @COMMANDS.md — lancer, tester, vérifier.

## Style de travail
- Répondre en prose sobre, agir quand l’info suffit.
- Ne jamais affirmer « c’est fait » sans avoir lancé la vérification.`,
      },
      {
        legende: 'Importer un guide spécialisé depuis le CLAUDE.md',
        code: `## Conventions
- @NAMING-CONVENTIONS.md — règles de nommage (inférées du code existant).
- @GIT-CONVENTIONS.md — Conventional Commits : types, scope, branches.

# La ligne « @chemin.md » charge le fichier dans le contexte au démarrage.`,
      },
    ],
    commentFaire: [
      'Commence petit : un CLAUDE.md d’une page suffit, enrichis-le quand un besoin réel apparaît.',
      'Décris ce que le code ne dit pas : le « pourquoi », les pièges, les commandes de vérification.',
      'Garde la source de vérité dans le code : le CLAUDE.md guide, il ne duplique pas l’implémentation.',
      'Versionne-le : il évolue avec le projet et profite à toute l’équipe.',
    ],
  },
  {
    slug: 'hooks',
    icon: 'cable',
    titre: 'Les hooks',
    accroche:
      'Un hook exécute ta commande à un moment précis du cycle de l’assistant — sans dépendre de sa vigilance.',
    definition:
      'Les hooks sont des commandes déclarées dans settings.json, déclenchées sur un événement (PostToolUse, PreToolUse, Stop…). Le hook reçoit un payload JSON sur l’entrée standard et peut formater un fichier, valider une règle ou afficher un message. C’est le bon outil quand on veut un comportement automatique et garanti.',
    pourquoi: [
      'Automatisme garanti : le formatage ou la vérification s’exécute toujours, pas « quand l’assistant y pense ».',
      'Visibilité : un hook PostToolUse peut résumer chaque changement pour que le développeur valide en connaissance de cause.',
      'Garde-fous : un hook peut signaler une violation de convention (valeur en dur, secret) au moment où elle apparaît.',
      'Robustesse : un hook bien écrit n’échoue jamais bruyamment — il ne doit pas bloquer le travail.',
    ],
    exemples: [
      {
        legende: 'Brancher un hook PostToolUse dans .claude/settings.json',
        code: `{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write|MultiEdit",
        "hooks": [
          {
            "type": "command",
            "command": "node \\"$CLAUDE_PROJECT_DIR/.claude/hooks/format-edited-file.mjs\\""
          }
        ]
      }
    ]
  }
}`,
      },
      {
        legende: 'Hook .mjs minimal — lit le payload, ne plante jamais',
        code: `#!/usr/bin/env node
// PostToolUse : reçoit un JSON sur stdin, agit, sort proprement.
import { readFileSync } from 'node:fs';

function readStdin() {
  try { return readFileSync(0, 'utf8'); } catch { return ''; }
}

let payload;
try { payload = JSON.parse(readStdin()); } catch { process.exit(0); }

const filePath = payload?.tool_input?.file_path;
if (!filePath) process.exit(0);

// … formater / valider le fichier ici …

// systemMessage est affiché à l’utilisateur (pas seulement au contexte).
process.stdout.write(JSON.stringify({ systemMessage: \`Vu : \${filePath}\` }));
process.exit(0);`,
      },
    ],
    commentFaire: [
      'Choisis l’événement juste : PostToolUse pour réagir à une édition, PreToolUse pour valider avant.',
      'Filtre avec « matcher » pour ne déclencher que sur les outils concernés (Edit, Write…).',
      'Ne plante jamais : entoure les lectures de try/catch et sors en code 0 par défaut.',
      'Remonte un message utile via « systemMessage » plutôt que d’agir en silence.',
    ],
  },
  {
    slug: 'commands-et-skills',
    icon: 'bolt',
    titre: 'Slash-commands & skills',
    accroche:
      'Une slash-command est un prompt réutilisable ; un skill, une capacité que l’assistant invoque quand elle s’applique.',
    definition:
      'Une slash-command est un fichier markdown dans .claude/commands/ : son corps devient un prompt, lancé par « /nom ». Un skill vit dans un dossier avec un SKILL.md décrit par un frontmatter ; l’assistant le charge de lui-même dès que sa description correspond à la tâche. Les deux capitalisent un savoir-faire répétable.',
    pourquoi: [
      'Réutilisation : on encode une fois une procédure (cadrer une tâche, ajouter un module) et on la rejoue d’un mot.',
      'Cohérence : la même commande produit le même cadrage, quel que soit le moment.',
      'Découverte : un skill bien décrit s’active automatiquement — pas besoin de se souvenir de l’invoquer.',
      'Partage : commandes et skills sont versionnés, donc disponibles pour toute l’équipe.',
    ],
    exemples: [
      {
        legende: 'Slash-command .claude/commands/brief.md',
        code: `---
description: Cadre une tâche et impose des check-ins visibles
argument-hint: <description de la tâche>
---

Tâche brute : $ARGUMENTS

Travaille en trois phases. Phase 1 — cadrage : reformule l’intention,
liste le périmètre, donne les critères d’acceptation, puis STOP et
attends mon « go » avant d’écrire la moindre ligne.`,
      },
      {
        legende: 'Structure d’un skill : SKILL.md avec frontmatter',
        code: `---
name: example-skill
description: Décrit QUAND utiliser ce skill — l’assistant s’en sert pour
  décider de l’activer. Sois précis sur le déclencheur.
---

# Quoi
Une phrase sur ce que fait le skill.

# Quand l’utiliser
Le cas concret qui doit déclencher l’activation.

# Procédure
1. Étape un.
2. Étape deux.`,
      },
    ],
    commentFaire: [
      'Soigne la « description » d’un skill : c’est elle qui décide de l’activation, pas le contenu.',
      'Utilise $ARGUMENTS dans une commande pour injecter ce que l’utilisateur tape après « /nom ».',
      'Garde une commande focalisée sur une intention claire plutôt qu’un couteau suisse.',
      'Commence par une slash-command ; passe au skill quand la logique mérite d’être chargée automatiquement.',
    ],
  },
  {
    slug: 'settings-et-mcp',
    icon: 'settings',
    titre: 'settings.json & serveurs MCP',
    accroche:
      'settings.json règle permissions et hooks ; les serveurs MCP ouvrent à Claude Code des outils externes (base, API…).',
    definition:
      'Le fichier .claude/settings.json (versionné, partagé par l’équipe) configure la session : liste d’autorisations pour réduire les confirmations, branchement des hooks, et déclaration de serveurs MCP. Un serveur MCP expose des outils — par exemple une base de données — que l’assistant peut appeler. Les secrets passent par des variables d’environnement, jamais en clair.',
    pourquoi: [
      'Moins de friction : une allow-list ciblée évite de re-valider les commandes sûres et fréquentes.',
      'Partage : settings.json est versionné ; settings.local.json reste personnel et hors dépôt.',
      'Extensibilité : un serveur MCP donne à l’assistant un accès direct et typé à un service externe.',
      'Sécurité : références d’ENV pour les secrets — aucune clé ni token dans le dépôt.',
    ],
    exemples: [
      {
        legende: 'Permissions ciblées dans .claude/settings.json',
        code: `{
  "permissions": {
    "allow": [
      "Bash(npm run lint)",
      "Bash(npm test)",
      "Bash(git status*)",
      "Bash(git diff*)"
    ]
  }
}`,
      },
      {
        legende: 'Serveur MCP avec secret via variable d’environnement',
        code: `{
  "mcpServers": {
    "database": {
      "command": "npx",
      "args": ["-y", "@some/mcp-server"],
      "env": {
        // Référence d’ENV — jamais la valeur en clair dans le dépôt.
        "DATABASE_URI": "\${DATABASE_URI}"
      }
    }
  }
}`,
      },
    ],
    commentFaire: [
      'N’autorise que des commandes sûres et précises : préfère « Bash(git status*) » à un blanc-seing.',
      'Mets les secrets dans des variables d’environnement et référence-les par « ${NOM} ».',
      'Garde le personnel hors dépôt : settings.local.json pour ce qui ne regarde que toi.',
      'Vérifie qu’un serveur MCP est nécessaire avant de l’ajouter : chaque outil élargit la surface.',
    ],
  },
];
