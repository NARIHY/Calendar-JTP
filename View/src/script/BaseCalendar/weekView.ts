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
