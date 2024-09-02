// monthView.ts
import { Calendar } from './calendar';

export class MonthView {
    private calendarElement: HTMLElement;
    private calendar: Calendar;

    constructor(calendarElement: HTMLElement, calendar: Calendar) {
        this.calendarElement = calendarElement;
        this.calendar = calendar;
    }

    public render() {
        this.calendarElement.innerHTML = '';
        const firstDayOfMonth = new Date(this.calendar.currentDate.getFullYear(), this.calendar.currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(this.calendar.currentDate.getFullYear(), this.calendar.currentDate.getMonth() + 1, 0);

        const prevMonthLastDay = new Date(this.calendar.currentDate.getFullYear(), this.calendar.currentDate.getMonth(), 0).getDate();
        const firstDayWeekday = firstDayOfMonth.getDay();
        for (let i = firstDayWeekday - 1; i >= 0; i--) {
            const day = prevMonthLastDay - i;
            this.addDay(day, 'disabled');
        }

        for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
            this.addDay(day);
        }
    }

    private addDay(day: number, className?: string) {
        const dayElement = document.createElement('div');
        dayElement.textContent = day.toString();
        dayElement.className = 'day' + (className ? ` ${className}` : '');
        dayElement.addEventListener('click', () => {
            const selectedDate = new Date(this.calendar.currentDate.getFullYear(), this.calendar.currentDate.getMonth(), day);
            this.calendar.setCurrentDate(selectedDate);
            this.calendar.changeView('day');
        });
        this.calendarElement.appendChild(dayElement);
    }
}
