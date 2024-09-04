/**
 * @author NARIHY <maheninarandrianarisoa@gmail.com>
 * @copyright 2024
 */

import { Calendar, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

// Définir les horaires de travail sous forme de tableau d'objets
const workingHours = [
  { title: '07:00-10:00', color: 'lightgreen' },
  { title: '10:00-10:20 (Pause)', color: 'orange' },
  { title: '10:20-12:00', color: 'lightgreen' },
  { title: '12:00-13:00 (Pause)', color: 'orange' },
  { title: '13:00-15:00', color: 'lightgreen' },
  { title: '15:00-17:00', color: 'lightgreen' },
];

/**
 * Crée des événements pour les horaires de travail à partir d'une date donnée.
 * @param date - La date pour laquelle les événements doivent être créés.
 * @returns Un tableau d'événements.
 */
const createWorkingHourEvents = (date: Date): EventInput[] => {
  const events: EventInput[] = [];
  const dateString = date.toISOString().split('T')[0];

  // Itère par paires d'horaires pour créer les événements
  for (let i = 0; i < workingHours.length; i += 2) {
    const startHour = workingHours[i];
    const endHour = workingHours[i + 1] || workingHours[i]; // Utilise le même horaire de fin si pas de pause suivante

    const [startTime] = startHour.title.split(' ')[0].split(':');
    const [endTime] = endHour.title.split(' ')[2].split(':');

    events.push({
      title: `${startHour.title} - ${endHour.title}`,
      start: `${dateString}T${startTime}:00`,
      end: `${dateString}T${endTime}:00`,
      backgroundColor: startHour.color,
      borderColor: startHour.color,
      textColor: 'black',
    });
  }

  return events;
};

// Référence au calendrier principal
let calendar: Calendar | undefined;

/**
 * Affiche le loader.
 */
const showLoader = () => {
  document.getElementById('loader')?.classList.remove('hidden');
};

/**
 * Masque le loader.
 */
const hideLoader = () => {
  document.getElementById('loader')?.classList.add('hidden');
};

/**
 * Change la vue du calendrier.
 * @param viewType - Le type de vue à changer (jour, semaine, mois).
 * @param date - Optionnel, la date à afficher si la vue est "timeGridDay".
 */
const changeView = (viewType: string, date?: Date) => {
  if (calendar) {
    showLoader();
    calendar.changeView(viewType);
    if (viewType === 'timeGridDay' && date) {
      calendar.gotoDate(date);
    }
    hideLoader();
  }
};

/**
 * Initialise le calendrier principal avec les configurations et les événements.
 */
function initializeMainCalendar(): void {
  const calendarEl = document.getElementById('calendar');

  if (calendarEl) {
    calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      headerToolbar: {
        left: '',
        center: 'title',
        right: '', // Supprimer les boutons de changement de vue par défaut
      },
      initialView: 'dayGridMonth', // Vue initiale par mois
      editable: true,
      selectable: true,
      events: [], // Ajoutez vos événements ici
      dateClick: (info) => {
        if (info.view.type === 'dayGridMonth') {
          changeView('timeGridDay', info.date);
        }
      },
      viewDidMount: () => {
        hideLoader();
      },
      viewWillUnmount: () => {
        showLoader();
      },
    });

    calendar.render();

    // Ajouter des boutons personnalisés pour changer les vues
    document.getElementById('show-month-view')?.addEventListener('click', () => {
      changeView('dayGridMonth');
    });

    document.getElementById('show-week-view')?.addEventListener('click', () => {
      changeView('timeGridWeek');
    });

    document.getElementById('show-day-view')?.addEventListener('click', () => {
      const date = calendar?.getDate();
      if (date) {
        changeView('timeGridDay', date);
      }
    });
  } else {
    console.error('L\'élément du calendrier n\'a pas été trouvé');
  }
}

/**
 * @author NARIHY <maheninarandrianarisoa@gmail.com>
 * @copyright 2024
 */

import { Calendar, EventInput } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

// Définir les horaires de travail avec des titres et des couleurs pour chaque plage horaire
const workingHours = [
  { title: '05:00-07:00', color: 'lightgreen' },
  { title: '07:00-08:00 (Pause)', color: 'orange' },
  { title: '08:00-10:00', color: 'lightgreen' },
  { title: '10:00-11:00 (Pause)', color: 'orange' },
  { title: '11:00-13:00', color: 'lightgreen' },
  { title: '13:00-14:00 (Pause)', color: 'orange' },
  { title: '14:00-16:00', color: 'lightgreen' },
  { title: '16:00-17:00', color: 'lightgreen' },
];

/**
 * Crée des événements basés sur les horaires de travail pour une date spécifique.
 * Cette fonction génère un tableau d'événements pour une journée donnée en utilisant les horaires définis dans `workingHours`.
 * 
 * @param date - La date pour laquelle les événements doivent être générés. Les événements seront pour cette date spécifique.
 * @returns Un tableau d'objets `EventInput`, chaque objet représentant un événement à afficher dans le calendrier.
 *          Les événements sont créés en fonction des horaires de travail définis.
 */
const createWorkingHourEvents = (date: Date): EventInput[] => {
  const events: EventInput[] = [];
  const dateString = date.toISOString().split('T')[0]; // Formate la date en chaîne au format YYYY-MM-DD

  // Itère sur les horaires de travail par paires (travail et pause)
  for (let i = 0; i < workingHours.length; i += 2) {
    const startHour = workingHours[i];
    const endHour = workingHours[i + 1] || workingHours[i]; // Utilise le même horaire de fin si pas de pause suivante

    // Extrait les heures de début et de fin à partir des titres
    const startTime = startHour.title.split(' ')[0];
    const endTime = endHour.title.split(' ')[2];

    // Crée un objet d'événement pour le calendrier
    events.push({
      title: `${startHour.title} - ${endHour.title}`,
      start: `${dateString}T${startTime}:00`,
      end: `${dateString}T${endTime}:00`,
      backgroundColor: startHour.color,
      borderColor: startHour.color,
      textColor: 'black',
    });
  }

  return events;
};

/**
 * Initialise et rend un calendrier en vue quotidienne pour une date spécifique.
 * Cette fonction configure le calendrier pour afficher une seule journée avec les événements créés en fonction des horaires de travail.
 * 
 * @param date - La date pour laquelle la vue quotidienne du calendrier doit être initialisée.
 * @returns Un objet `Calendar` si l'élément du calendrier est trouvé et correctement initialisé. Sinon, aucune valeur n'est retournée.
 */
export function initializeSingleDayView(date: Date): Calendar | void {
  const calendarEl = document.getElementById('calendar');

  // Vérifie si l'élément du calendrier est présent dans le DOM
  if (calendarEl) {
    // Crée une instance de Calendar avec les options spécifiées
    const calendar = new Calendar(calendarEl, {
      plugins: [timeGridPlugin, interactionPlugin], // Plugins nécessaires pour la vue quotidienne et l'interaction
      headerToolbar: {
        left: 'prev,next today', // Boutons pour naviguer entre les jours et le bouton "aujourd'hui"
        center: 'title', // Affiche le titre du calendrier au centre
        right: 'timeGridDay', // Affiche uniquement le bouton pour la vue quotidienne
      },
      initialView: 'timeGridDay', // Définit la vue initiale du calendrier sur la vue quotidienne
      editable: true, // Permet la modification des événements
      selectable: true, // Permet la sélection des plages horaires
      events: createWorkingHourEvents(date), // Ajoute les événements basés sur les horaires de travail pour la date spécifiée
      viewDidMount: () => {
        // Masque le loader après le rendu de la vue
        document.getElementById('loader')?.classList.add('hidden');
      },
      dayCellDidMount: (info) => {
        // Personnalise l'apparence des cellules de jour
        const cell = info.el;
        cell.style.backgroundColor = 'lightgray'; // Définit la couleur de fond des cellules de jour
        cell.style.border = '1px solid gray'; // Définit la bordure des cellules de jour
      },
      views: {
        timeGridDay: {
          // Configuration spécifique à la vue quotidienne
          slotMinTime: '05:00:00', // Heure de début minimale affichée dans la vue quotidienne
          slotMaxTime: '17:00:00', // Heure de fin maximale affichée dans la vue quotidienne
          slotDuration: '01:00:00', // Durée des créneaux horaires
          slotLabelInterval: '01:00:00', // Intervalle des étiquettes de créneaux horaires
          slotLabelFormat: { hour: '2-digit', minute: '2-digit', meridiem: 'short' }, // Format d'affichage des étiquettes de créneaux horaires
          nowIndicator: true, // Affiche l'indicateur de l'heure actuelle
        },
      },
    });

    // Rends le calendrier dans l'élément DOM et retourne l'objet calendrier
    calendar.render();
    return calendar;
  } else {
    // Affiche un message d'erreur si l'élément du calendrier n'est pas trouvé
    console.error('Calendar element not found');
  }
}
/**
 * @author NARIHY <maheninarandrianarisoa@gmail.com>
 * @copyright 2024
 */

import { Calendar, EventInput } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

// Définir les horaires de travail avec leurs titres et couleurs
const workingHours = [
  { title: '05:00-07:00', color: 'lightgreen' },
  { title: '07:00-08:00 (Pause)', color: 'orange' },
  { title: '08:00-10:00', color: 'lightgreen' },
  { title: '10:00-11:00 (Pause)', color: 'orange' },
  { title: '11:00-13:00', color: 'lightgreen' },
  { title: '13:00-14:00 (Pause)', color: 'orange' },
  { title: '14:00-16:00', color: 'lightgreen' },
  { title: '16:00-17:00', color: 'lightgreen' },
];

/**
 * Crée des événements pour les horaires de travail pour une période donnée.
 * Les événements sont créés en fonction des horaires définis dans `workingHours` pour la période
 * allant du début à la fin spécifiée. Chaque événement représente une plage horaire de travail ou de pause.
 * 
 * @param start - La date et l'heure de début de la période pour laquelle les événements doivent être générés.
 * @param end - La date et l'heure de fin de la période pour laquelle les événements doivent être générés.
 * @returns Un tableau d'objets `EventInput` représentant les événements à afficher dans le calendrier.
 *          Chaque objet contient les détails de l'événement, y compris le titre, les horaires de début et de fin,
 *          ainsi que les couleurs d'affichage.
 */
const createWorkingHourEvents = (start: Date, end: Date): EventInput[] => {
  const events: EventInput[] = [];
  
  // Itère sur les horaires de travail en paires (plages de travail et pauses)
  for (let i = 0; i < workingHours.length; i += 2) {
    const startHour = workingHours[i];
    const endHour = workingHours[i + 1] || workingHours[i]; // Utilise le même horaire de fin si aucune pause suivante

    // Extrait les heures de début et de fin à partir des titres
    const startTime = startHour.title.split(' ')[0];
    const endTime = endHour.title.split(' ')[2];

    // Crée un événement pour chaque plage horaire
    events.push({
      title: `${startHour.title} - ${endHour.title}`,
      start: `${start.toISOString().split('T')[0]}T${startTime}:00`,
      end: `${end.toISOString().split('T')[0]}T${endTime}:00`,
      backgroundColor: startHour.color,
      borderColor: startHour.color,
      textColor: 'black',
    });
  }
  
  return events;
};

/**
 * Initialise et rend un calendrier en vue hebdomadaire.
 * Cette fonction configure le calendrier pour afficher une vue hebdomadaire, avec les événements générés
 * pour la semaine en cours basée sur les horaires de travail définis.
 * 
 * @returns Un objet `Calendar` si l'élément du calendrier est trouvé et correctement initialisé. 
 *          Sinon, aucune valeur n'est retournée.
 */
export function initializeWeekView(): Calendar | void {
  const calendarEl = document.getElementById('calendar');

  // Vérifie si l'élément du calendrier est présent dans le DOM
  if (calendarEl) {
    // Crée une instance de Calendar avec les options spécifiées
    const calendar = new Calendar(calendarEl, {
      plugins: [timeGridPlugin, interactionPlugin], // Plugins nécessaires pour la vue hebdomadaire et l'interaction
      headerToolbar: {
        left: 'prev,next today', // Boutons pour naviguer entre les semaines et bouton "aujourd'hui"
        center: 'title', // Affiche le titre du calendrier au centre
        right: 'timeGridWeek', // Affiche uniquement le bouton pour la vue hebdomadaire
      },
      initialView: 'timeGridWeek', // Définit la vue initiale du calendrier sur la vue hebdomadaire
      editable: true, // Permet la modification des événements
      selectable: true, // Permet la sélection des plages horaires
      events: (info, successCallback) => {
        // Crée les événements pour la semaine en cours
        const startOfWeek = new Date(info.view.activeStart);
        const endOfWeek = new Date(info.view.activeEnd);
        successCallback(createWorkingHourEvents(startOfWeek, endOfWeek));
      },
      viewDidMount: () => {
        // Masque le loader après le rendu de la vue
        document.getElementById('loader')?.classList.add('hidden');
        // Masque les plages horaires non désirées via CSS
        const slots = document.querySelectorAll('.fc-timegrid-slot');
        slots.forEach(slot => {
          const time = slot.getAttribute('data-time');
          if (time) {
            const [hour] = time.split(':');
            if (parseInt(hour) < 5 || parseInt(hour) >= 17) {
              slot.style.display = 'none'; // Cache les créneaux horaires en dehors de la plage horaire définie
            }
          }
        });
      },
      views: {
        timeGridWeek: {
          // Configuration spécifique à la vue hebdomadaire
          slotMinTime: '05:00:00', // Heure de début minimale affichée dans la vue hebdomadaire
          slotMaxTime: '17:00:00', // Heure de fin maximale affichée dans la vue hebdomadaire
          slotDuration: '01:00:00', // Durée des créneaux horaires
          slotLabelInterval: '01:00:00', // Intervalle des étiquettes de créneaux horaires
          slotLabelFormat: { hour: '2-digit', minute: '2-digit', meridiem: 'short' }, // Format d'affichage des étiquettes de créneaux horaires
          nowIndicator: true, // Affiche l'indicateur de l'heure actuelle
        },
      },
    });

    // Rends le calendrier dans l'élément DOM et retourne l'objet calendrier
    calendar.render();
    return calendar;
  } else {
    // Affiche un message d'erreur si l'élément du calendrier n'est pas trouvé
    console.error('Calendar element not found');
  }
}
/main
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { createWorkingHourEvents } from './events'; // Assurez-vous que cette fonction est correctement exportée

let calendar: Calendar | undefined;

// Fonction pour afficher le loader
const showLoader = () => {
  document.getElementById('loader')?.classList.remove('hidden');
};

// Fonction pour masquer le loader
const hideLoader = () => {
  document.getElementById('loader')?.classList.add('hidden');
};

// Fonction pour réinitialiser le calendrier pour une vue donnée
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
      const selectedDate = calendar.getDate(); // Récupérer la date sélectionnée dans la vue actuelle
      setupCalendar(viewType, selectedDate); // Passer la date sélectionnée à la vue quotidienne
    } else {
      setupCalendar(viewType); // Réinitialiser sans date spécifique pour les autres vues
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





// event 
/**
 * @author NARIHY <maheninarandrianarisoa@gmail.com>
 * @copyright 2024
 */

import { EventInput } from '@fullcalendar/core';

// Définir les horaires de travail avec leurs titres et couleurs respectifs
const workingHours = [
  { title: '07:00-10:00', color: 'lightgreen' },
  { title: '10:00-10:20 (Pause)', color: 'orange' },
  { title: '10:20-12:00', color: 'lightgreen' },
  { title: '12:00-13:00 (Pause)', color: 'orange' },
  { title: '13:00-15:00', color: 'lightgreen' },
  { title: '15:00-17:00', color: 'lightgreen' },
];

/**
 * Crée des événements basés sur les horaires de travail pour une date donnée.
 * Les horaires de travail sont définis dans le tableau `workingHours` et sont utilisés pour créer des événements
 * dans le calendrier. Chaque événement représente une plage horaire de travail ou de pause.
 * 
 * @param date - La date pour laquelle les événements doivent être générés. La date est utilisée pour créer
 *                les événements avec la date spécifiée et les horaires de travail définis.
 * @returns Un tableau d'objets `EventInput` représentant les événements à afficher dans le calendrier.
 *          Chaque objet inclut les informations suivantes :
 *          - `title`: Le titre de l'événement.
 *          - `start`: La date et l'heure de début de l'événement.
 *          - `end`: La date et l'heure de fin de l'événement.
 *          - `backgroundColor`: La couleur de fond de l'événement.
 *          - `borderColor`: La couleur de bordure de l'événement.
 *          - `textColor`: La couleur du texte de l'événement.
 */
export const createWorkingHourEvents = (date: Date): EventInput[] => {
  // Initialise un tableau pour stocker les événements créés
  const events: EventInput[] = [];
  
  // Formate la date en chaîne au format YYYY-MM-DD
  const dateString = date.toISOString().split('T')[0];

  // Itère à travers les horaires de travail, deux par deux, pour créer des événements
  for (let i = 0; i < workingHours.length; i += 2) {
    // Prend l'heure de début et l'heure de fin pour chaque paire
    const startHour = workingHours[i];
    const endHour = workingHours[i + 1] || workingHours[i]; // Si pas de pause suivante, utilise le même horaire de fin

    // Extrait les heures de début et de fin
    const startTime = startHour.title.split(' ')[0];
    const endTime = endHour.title.split(' ')[2];

    // Crée un objet d'événement pour le calendrier
    events.push({
      title: `${startHour.title} - ${endHour.title}`,
      start: `${dateString}T${startTime}:00`,
      end: `${dateString}T${endTime}:00`,
      backgroundColor: startHour.color,
      borderColor: startHour.color,
      textColor: 'black',
    });
  }

  // Retourne le tableau d'événements créés
  return events;
};
/**
 * @author NARIHY <maheninarandrianarisoa@gmail.com>
 * @copyright 2024
 */

import { Calendar, EventInput } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

/**
 * Initialise et rend un calendrier en vue quotidienne avec des horaires de travail spécifiés.
 * @param date - La date pour laquelle les événements doivent être créés et affichés dans la vue quotidienne.
 * @returns Un objet Calendar si l'élément du calendrier est trouvé et correctement initialisé, sinon undefined.
 */
export function initializeDailyView(date: Date): Calendar | undefined {
  // Sélectionne l'élément DOM où le calendrier sera rendu
  const calendarEl = document.getElementById('calendar');

  // Vérifie si l'élément du calendrier est présent dans le DOM
  if (calendarEl) {
    // Crée une instance de Calendar avec les options spécifiées
    const calendar = new Calendar(calendarEl, {
      plugins: [timeGridPlugin, interactionPlugin], // Ajoute les plugins nécessaires pour la vue quotidienne et l'interaction
      headerToolbar: {
        left: 'prev,next today', // Boutons de navigation et bouton "aujourd'hui"
        center: 'title', // Titre du calendrier
        right: 'timeGridDay' // Affiche uniquement le bouton pour passer à la vue quotidienne
      },
      initialView: 'timeGridDay', // Définit la vue initiale du calendrier sur la vue quotidienne
      editable: true, // Permet la modification des événements
      selectable: true, // Permet la sélection des plages horaires
      events: createWorkingHourEvents(date), // Ajoute les événements basés sur les horaires de travail
      viewDidMount: () => {
        // Masque le loader après le rendu de la vue
        document.getElementById('loader')?.classList.add('hidden');
      },
      viewWillUnmount: () => {
        // Affiche le loader avant le changement de vue
        document.getElementById('loader')?.classList.remove('hidden');
      },
      dayCellDidMount: (info) => {
        // Personnalise l'apparence des cellules de jour
        const cell = info.el;
        cell.style.backgroundColor = 'lightgray'; // Définit la couleur de fond des cellules de jour
        cell.style.border = '1px solid gray'; // Définit la bordure des cellules de jour
      },
      views: {
        timeGridDay: {
          // Configuration spécifique à la vue quotidienne
          slotMinTime: '07:00:00', // Heure de début minimale affichée dans la vue quotidienne
          slotMaxTime: '18:00:00', // Heure de fin maximale affichée dans la vue quotidienne
          slotDuration: '01:00:00', // Durée des créneaux horaires
          slotLabelInterval: '01:00:00', // Intervalle des étiquettes de créneaux horaires
          slotLabelFormat: { hour: '2-digit', minute: '2-digit', meridiem: 'short' }, // Format d'affichage des étiquettes de créneaux horaires
          nowIndicator: true, // Affiche l'indicateur de l'heure actuelle
        }
      }
    });

    // Rends le calendrier dans l'élément DOM
    calendar.render();
    return calendar;
  } else {
    // Affiche un message d'erreur si l'élément du calendrier n'est pas trouvé
    console.error('Calendar element not found');
    return undefined;
  }
}
VOici mes code, j'aimerai continuer ce projet