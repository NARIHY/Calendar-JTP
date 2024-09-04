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
