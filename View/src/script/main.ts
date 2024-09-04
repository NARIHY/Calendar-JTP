import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { createWorkingHourEvents } from './events'; // Assurez-vous que cette fonction est correctement exportée
import { MenuManager } from './Menu/MenuManager';

// Initialisation du gestionnaire de menu
const menuManager = new MenuManager();

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
