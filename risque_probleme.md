# Probleme et résolution de la partie front

# Calendar App

## Description

Calendar App est une application permettant de représenter des plannings sous forme de calendrier. Ce projet utilise Vite comme outil de construction et de développement, et intègre des composants tels que FullCalendar pour la gestion des événements.

## Structure du Projet

```
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
```

## Prérequis

- Node.js
- npm (ou yarn)

## Installation

1. Clonez le dépôt :

   ```bash
   git clone <https://github.com/NARIHY/Calendar-JTP>
   cd calendar-app
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

## Configuration

1. **Structure du Projet**

   La structure du projet a été configurée comme suit pour aligner avec les besoins de Vite et des fichiers source :
   
   ```
   calendar-app/
   ├── dist/                    # Fichiers construits
   ├── View/                    # Fichiers source
   ├── package.json
   ├── tsconfig.json
   └── vite.config.ts
   ```

2. **Vite Configuration**

   - **`vite.config.ts`** :
   
     ```typescript
     import { defineConfig } from 'vite';
     import { resolve } from 'path';
     import { createHtmlPlugin } from 'vite-plugin-html';

     export default defineConfig({
       root: 'View', // Répertoire racine des fichiers source
       build: {
         outDir: '../dist', // Répertoire de sortie pour les fichiers construits
         sourcemap: true, // Générer des sourcemaps pour le débogage
       },
       server: {
         port: 3000, // Port par défaut
         open: true, // Ouvrir automatiquement dans le navigateur
       },
       plugins: [
         createHtmlPlugin({
           inject: {
             inject: '<link rel="stylesheet" href="/css/style.css">', // Charger le CSS global
           },
         }),
       ],
       resolve: {
         alias: {
           '@': resolve(__dirname, 'View'), // Alias pour le répertoire source
         },
       },
     });
     ```

   - **Répertoire `View`** a été défini comme la racine pour Vite, et la sortie des fichiers construits est spécifiée dans `dist`.

3. **Configuration de TypeScript**

   - **`tsconfig.json`** :

     ```json
     {
       "compilerOptions": {
         "target": "ES2015",
         "module": "ESNext",
         "rootDir": "./View",
         "outDir": "./dist",
         "moduleResolution": "node",
         "esModuleInterop": true,
         "strict": true,
         "skipLibCheck": true
       },
       "include": [
         "View/**/*.ts"
       ],
       "exclude": [
         "node_modules"
       ]
     }
     ```

4. **Fichier `index.html`**

   - **`View/index.html`** :

     ```html
     <!DOCTYPE html>
     <html lang="en">
     <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Calendar App</title>
       <link rel="stylesheet" href="/css/style.css"> <!-- Chemin relatif vers style.css -->
     </head>
     <body>
       <div id="app"></div>
       <script type="module" src="/main.ts"></script> <!-- Chemin relatif vers main.ts -->
     </body>
     </html>
     ```

## Exécution

Pour lancer le serveur de développement, utilisez :

```bash
npm run dev
```

Pour construire le projet pour la production, utilisez :

```bash
npm run build
```

Les fichiers construits seront générés dans le répertoire `dist`.

## Dépannage

- **Problèmes de Chemin** : Assurez-vous que les chemins dans les fichiers de configuration et dans `index.html` sont corrects.
- **Erreur 404** : Vérifiez que les fichiers TypeScript et CSS existent dans le répertoire `View` et que la configuration Vite est correctement alignée avec la structure des répertoires.

## Contribution

Les contributions sont les bienvenues ! Veuillez ouvrir une issue ou une pull request si vous souhaitez contribuer au projet.

## License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.
