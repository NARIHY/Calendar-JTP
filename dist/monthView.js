"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonthView = void 0;
class MonthView {
    constructor(calendarElement, calendar) {
        this.calendarElement = calendarElement;
        this.calendar = calendar;
    }
    render() {
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
    addDay(day, className) {
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
exports.MonthView = MonthView;
