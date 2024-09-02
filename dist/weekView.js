export class WeekView {
    constructor(calendarElement, calendar) {
        this.calendarElement = calendarElement;
        this.calendar = calendar;
    }
    render() {
        this.calendarElement.innerHTML = '';
        const startOfWeek = new Date(this.calendar.currentDate);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); // Set to Monday
        for (let i = 0; i < 5; i++) { // Monday to Friday
            const day = new Date(startOfWeek);
            day.setDate(day.getDate() + i);
            this.addDay(day);
        }
    }
    addDay(date) {
        const dayElement = document.createElement('div');
        dayElement.textContent = date.toDateString();
        dayElement.className = 'day';
        dayElement.addEventListener('click', () => {
            this.calendar.setCurrentDate(date);
            this.calendar.changeView('day');
        });
        this.calendarElement.appendChild(dayElement);
        this.addTimeSlots();
    }
    addTimeSlots() {
        const timeSlots = ['08:00-12:00', '13:00-14:00'];
        timeSlots.forEach(slot => {
            const slotElement = document.createElement('div');
            slotElement.textContent = slot;
            slotElement.className = 'day';
            if (slot.includes('13:00-14:00')) {
                slotElement.style.backgroundColor = 'black';
                slotElement.style.color = 'white';
            }
            this.calendarElement.appendChild(slotElement);
        });
    }
}
