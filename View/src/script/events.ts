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
