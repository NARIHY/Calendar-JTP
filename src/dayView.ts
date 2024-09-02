// dayView.ts
import { Calendar } from './calendar';

export class DayView {
    private calendarElement: HTMLElement;
    private calendar: Calendar;

    constructor(calendarElement: HTMLElement, calendar: Calendar) {
        this.calendarElement = calendarElement;
        this.calendar = calendar;
    }

    public render() {
        this.calendarElement.innerHTML = '';
        const timeSlots = [
            { time: '08:00-10:00', break: '10:00-10:20' },
            { time: '10:20-12:00', break: '12:00-13:00' },
            { time: '13:00-16:00' }
        ];

        timeSlots.forEach(slot => {
            this.addTimeSlot(slot.time, false);
            if (slot.break) {
                this.addTimeSlot(slot.break, true);
            }
        });
    }

    private addTimeSlot(time: string, isBreak: boolean) {
        const slotElement = document.createElement('div');
        slotElement.textContent = time;
        slotElement.className = 'day';
        if (isBreak) {
            slotElement.style.backgroundColor = 'black';
            slotElement.style.color = 'white';
        }
        this.calendarElement.appendChild(slotElement);
    }
}
