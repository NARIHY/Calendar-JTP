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
