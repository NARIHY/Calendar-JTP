Gestion de calendrier (Relative aux gestion de planning)

Impossible de le faire avec du typescript simple d'où j'ai fait appelle à vide.
celle de la branche main et dev ne fonctionne pas. il y en as des bug, je ne sais pas pourquoi. 
dans celle de la branche dev, j'ai opté pour utiliser du webpack, mais j'ai vue que cela ne fonctionnait pas.
d'ou j'ai opté pour changer de solution et j'ai utiliser vite. (d'ou le nom de la branch vite)

# Architecture du projet 
calendar-app/
│
├── dist/                    # Répertoire de sortie pour les fichiers construits
│   ├── main.js              # Fichiers JavaScript construits (output)
│   ├── Calendar.js
│   └── style.css            # CSS construit (si utilisé dans TypeScript)
│
├── View/                    # Répertoire contenant les fichiers source et le fichier HTML
│   ├── index.html           # Fichier HTML principal
│   ├── main.ts              # Point d'entrée TypeScript
│   ├── Calendar.ts
│   └── css/
│       └── style.css        # Fichiers CSS source
│
├── package.json             # Dépendances et scripts
├── tsconfig.json            # Configuration TypeScript
└── vite.config.ts           # Configuration Vite


# Dependance 
Intallation de npm d'abord
-----------------
npm install
-----------------
Si vous n'avez pas encore installé vite-plugin-html, faites-le maintenant :

bash
Copier le code
npm install vite-plugin-html --save-dev

Démarrer le serveur de développement :

bash
Copier le code
npm run dev
Vous devriez voir votre projet se lancer sur http://localhost:3000 par défaut.

Construire le projet :

bash
Copier le code
npm run build
Les fichiers construits 