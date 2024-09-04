document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle') as HTMLButtonElement;
    const sidebar = document.getElementById('sidebar') as HTMLDivElement;
    const calendarContainer = document.getElementById('calendar-container') as HTMLDivElement;
    
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('show');
      calendarContainer.classList.toggle('sidebar-open');
      
      if (sidebar.classList.contains('show')) {
        menuToggle.innerHTML = '<i class="fas fa-times"></i>'; // Changer l'icône en icône de fermeture
      } else {
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>'; // Réinitialiser l'icône en icône de menu
      }
    });
  });
  