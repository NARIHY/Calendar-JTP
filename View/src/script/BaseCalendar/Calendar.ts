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
