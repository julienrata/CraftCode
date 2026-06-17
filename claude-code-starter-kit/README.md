# Claude Code Starter Kit

Un point de départ réutilisable pour mettre en place **Claude Code** dans
n'importe quel projet. Tout est générique : copie le dossier, remplace les
`<…>` et adapte à ta stack. Aucun secret n'est versionné — les valeurs
sensibles passent par des variables d'environnement.

Ce kit est dérivé d'un setup réel et éprouvé (le projet CraftCode), généralisé.

## Ce que contient le kit

```
claude-code-starter-kit/
├─ CLAUDE.md                       # Mémoire du projet (lue au démarrage)
├─ README.md                       # Ce fichier
└─ .claude/
   ├─ settings.json               # Permissions, hooks, serveurs MCP
   ├─ hooks/
   │  ├─ format-edited-file.mjs   # Formate chaque fichier édité (PostToolUse)
   │  └─ summarize-change.mjs     # Résume chaque changement +/− (PostToolUse)
   ├─ commands/
   │  ├─ brief.md                 # /brief — cadre une tâche, impose des check-ins
   │  └─ add-module.md            # /add-module — scaffolde un module selon la procédure
   └─ skills/
      └─ example-skill/SKILL.md   # Squelette d'un skill
```

### Rôle de chaque fichier

- **CLAUDE.md** — la mémoire du projet. Claude Code la lit automatiquement au
  démarrage : description du projet, style de travail attendu, et liens
  « @fichier.md » vers les guides détaillés. Garde-le court ; il oriente, il ne
  duplique pas le code.

- **.claude/settings.json** — la configuration de session, versionnée et
  partagée par l'équipe. Trois blocs : `permissions` (allow-list de commandes
  sûres pour éviter de re-valider à chaque fois), `hooks` (branchement des
  scripts ci-dessous), et `mcpServers` (déclaration d'outils externes). À savoir :
  le JSON n'autorise pas les commentaires ; les secrets se réfèrent par `${NOM}`,
  jamais en clair.

- **.claude/hooks/format-edited-file.mjs** — hook PostToolUse qui formate
  automatiquement tout fichier que l'assistant édite (cherche le Prettier le plus
  proche). Remplace le formateur par celui de ta stack si besoin.

- **.claude/hooks/summarize-change.mjs** — hook PostToolUse qui affiche, après
  chaque édition, un résumé visible (`+ajouts −retraits` vs dernier commit) via le
  champ `systemMessage`. But : voir ce que l'assistant change, sans dépendre de sa
  vigilance.

- **.claude/commands/brief.md** — slash-command `/brief <tâche>` : impose un
  cadrage (intention, périmètre, critères) avec un STOP avant tout code.

- **.claude/commands/add-module.md** — slash-command `/add-module <slug> "<Nom>"` :
  scaffolde un nouveau module en suivant la procédure et les conventions du projet.

- **.claude/skills/example-skill/SKILL.md** — gabarit d'un skill : une capacité
  que l'assistant invoque de lui-même quand sa `description` correspond à la tâche.

## Minimum vital vs optionnel

- **Minimum vital** : `CLAUDE.md`. À lui seul, il donne à Claude Code le contexte
  essentiel. Commence là.
- **Fortement recommandé** : `.claude/settings.json` avec quelques permissions
  ciblées — réduit nettement les confirmations répétitives.
- **Optionnel, à valeur ajoutée** : les hooks (automatisme et visibilité), les
  slash-commands (procédures réutilisables), les skills (capacités auto-activées),
  les serveurs MCP (accès à des outils externes). Ajoute-les quand un besoin réel
  apparaît, pas par principe.

## Démarrer Claude Code sur un nouveau projet

1. **Copie le kit** à la racine de ton projet :
   `cp -r claude-code-starter-kit/CLAUDE.md claude-code-starter-kit/.claude .`
   (puis supprime le kit si tu l'avais cloné à part).
2. **Renseigne CLAUDE.md** : remplace les `<…>`, décris le projet, et ne garde
   que les lignes « @fichier.md » qui pointent vers des documents existants.
3. **Ajuste les permissions** dans `.claude/settings.json` : ne laisse que des
   commandes sûres et propres à ta stack (ex. `Bash(pytest*)`, `Bash(go test*)`).
4. **Adapte les hooks** à ton formateur si tu n'utilises pas Prettier ; sinon,
   laisse-les. Ils sont déjà branchés dans `settings.json`.
5. **Configure les serveurs MCP** si besoin : remplace le placeholder `database`
   par ton serveur, et passe les secrets par des variables d'environnement
   (`${NOM}`). Sinon, retire le bloc `mcpServers`.
6. **Personnalise les commandes** `brief.md` / `add-module.md` (commande de
   vérification, étapes propres au projet) ou ajoute les tiennes.
7. **Lance Claude Code** dans le dossier du projet : il lit `CLAUDE.md` et
   `.claude/settings.json` au démarrage. Vérifie que `/brief` apparaît et que les
   hooks se déclenchent (un résumé `📝` s'affiche après une édition).
8. **Itère** : enrichis CLAUDE.md et ajoute hooks/commands/skills au fil des
   besoins réels.
