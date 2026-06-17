---
description: Scaffolder un nouveau module en suivant la procédure du projet
argument-hint: <slug> "<Nom affiché>"
---

Tu vas ajouter un nouveau module au projet en suivant **exactement** la procédure
documentée (ex. un fichier ADD-A-MODULE.md) et les conventions du dépôt
(@CONVENTIONS.md). La source de vérité reste le code existant : imite un module
déjà en place plutôt que d'inventer une structure.

Arguments fournis : `$ARGUMENTS`
(format attendu : `slug "Nom affiché"` ; si le slug ou le nom manque, demande-le
avant de commencer.)

Déroule les étapes dans l'ordre, sans en sauter. Adapte cette trame à ta stack ;
exemple type pour une feature front + back :

1. **Modèle / types** — l'interface ou le schéma du module.
2. **Données / contenu** — la source de vérité (constante, fixture, migration).
3. **Vue principale** — le composant ou l'endpoint d'entrée du module.
4. **Vue de détail** (si applicable) — résolution réactive d'un paramètre, repli
   propre si l'identifiant est inconnu.
5. **Routage** — branche le module dans la table de routes / le routeur.
6. **Navigation** — ajoute le point d'entrée (menu, index).
7. **Persistance** — l'entrée de seed / migration si le module y figure.

Puis **vérifie** avec la commande de contrôle du projet (lint + tests/build) et
colle sa sortie.

Termine par un résumé des fichiers créés/modifiés. Ne committe rien sans demande
explicite.
