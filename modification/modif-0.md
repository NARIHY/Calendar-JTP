dernier modif fait pour le dernier commit

# Projet de Calendrier

Ce projet utilise la bibliothèque FullCalendar pour créer une interface de calendrier interactive. Le calendrier permet de visualiser des événements et de naviguer entre différentes vues (mensuelle, hebdomadaire et quotidienne).

## Fonctionnalités

- **Vue Mensuelle** : Affiche un aperçu du mois avec des jours cliquables.
- **Vue Hebdomadaire** : Affiche une semaine complète avec des créneaux horaires de travail.
- **Vue Quotidienne** : Affiche une journée spécifique avec des créneaux horaires détaillés.
- **Navigation entre les Vues** : Permet de passer de la vue mensuelle à la vue quotidienne pour un jour sélectionné.
- **Gestion des Horaires de Travail** : Affiche les plages horaires de travail et les pauses dans la vue quotidienne et hebdomadaire.

## Installation

1. **Cloner le Répertoire**

   ```bash
   git clone https://github.com/NARIHY/Calendar-JTP
   ```
    nb: changer de branche après (vite)
       ```bash
   git checkout vite
   ```
2. **Installer les Dépendances**

   Assurez-vous d'avoir [Node.js](https://nodejs.org/) installé. Ensuite, dans le répertoire du projet, exécutez :

   ```bash
   npm install
   ```

3. **Lancer le Projet**

   Pour démarrer le serveur de développement et voir le calendrier en action :

   ```bash
   npm run dev
   ```

## Structure du Code

- **`src/main.ts`** : Initialise le calendrier et gère les vues principales.
- **`src/singleDayCalendar.ts`** : Module pour afficher la vue quotidienne avec les événements pour un jour spécifique.
- **`src/weekView.ts`** : Module pour gérer la vue hebdomadaire.
- **`src/events.ts`** : Définit les horaires de travail et crée des événements pour les différentes vues.
- **`styles.css`** : Contient les styles CSS pour le calendrier et les éléments de la page.

## Fonctionnalités Détails

### Initialisation du Calendrier

Le calendrier est initialisé avec la vue mensuelle par défaut. En cliquant sur un jour dans la vue mensuelle, le calendrier passe à la vue quotidienne pour afficher les événements du jour sélectionné.

### Gestion des Vues

- **Vue Mensuelle** : Vue par défaut au démarrage. Permet de voir l'ensemble du mois et de cliquer sur un jour pour afficher ses détails.
- **Vue Hebdomadaire** : Affiche une semaine entière, avec des créneaux horaires de 05:00 à 17:00.
- **Vue Quotidienne** : Affiche une journée spécifique avec des créneaux horaires détaillés et les événements programmés.

### Chargement et Réinitialisation
(bug ici)
Un loader est affiché lors du changement de vue pour indiquer que le calendrier est en cours de chargement. Le loader est masqué une fois le calendrier prêt.

## Utilisation

1. **Changer de Vue** : Utilisez les boutons dans le menu pour changer entre la vue mensuelle, hebdomadaire et quotidienne.
2. **Naviguer par Date** : Cliquez sur un jour dans la vue mensuelle pour afficher ses détails dans la vue quotidienne.

## Exemple de Code

Voici un extrait de code pour configurer le calendrier et gérer les vues :

```typescript
// main.ts
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { createWorkingHourEvents } from './events';

let calendar: Calendar | undefined;

const showLoader = () => {
  document.getElementById('loader')?.classList.remove('hidden');
};

const hideLoader = () => {
  document.getElementById('loader')?.classList.add('hidden');
};

const setupCalendar = (viewType: string, date?: Date) => {
  showLoader();

  if (calendar) {
    calendar.destroy();
  }

  const calendarEl = document.getElementById('calendar')!;
  
  calendar = new Calendar(calendarEl, {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    initialView: viewType,
    editable: true,
    selectable: true,
    events: (info, successCallback) => {
      if (viewType === 'timeGridDay' && date) {
        successCallback(createWorkingHourEvents(date));
      }
    },
    viewDidMount: () => {
      hideLoader();
    },
    viewWillUnmount: () => {
      showLoader();
    },
    dateClick: (info) => {
      if (viewType === 'dayGridMonth') {
        setupCalendar('timeGridDay', info.date);
      }
    },
    views: {
      timeGridWeek: {
        slotMinTime: '05:00:00',
        slotMaxTime: '17:00:00',
        slotDuration: '01:00:00',
        slotLabelInterval: '01:00:00',
        slotLabelFormat: { hour: '2-digit', minute: '2-digit', meridiem: 'short' },
        nowIndicator: true,
      },
      timeGridDay: {
        slotMinTime: '05:00:00',
        slotMaxTime: '17:00:00',
        slotDuration: '01:00:00',
        slotLabelInterval: '01:00:00',
        slotLabelFormat: { hour: '2-digit', minute: '2-digit', meridiem: 'short' },
        nowIndicator: true,
      },
    },
  });

  calendar.render();
};

const changeView = (viewType: string) => {
  if (calendar) {
    showLoader();
    if (viewType === 'timeGridDay') {
      const selectedDate = calendar.getDate();
      setupCalendar(viewType, selectedDate);
    } else {
      setupCalendar(viewType);
    }
  }
};

function initializeMainCalendar(): void {
  setupCalendar('dayGridMonth'); // Vue principale par défaut : Mois

  // Gestion des boutons du menu
  document.getElementById('show-month-view')?.addEventListener('click', () => {
    changeView('dayGridMonth');
  });

  document.getElementById('show-week-view')?.addEventListener('click', () => {
    changeView('timeGridWeek');
  });

  document.getElementById('show-day-view')?.addEventListener('click', () => {
    changeView('timeGridDay');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initializeMainCalendar();
});
```

## Auteurs

- Votre Nom - [NARIHY](https://github.com/NARIHY)

## Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour les détails.
