// calendar.ts
import { MonthView } from './monthView';
import { WeekView } from './weekView';
import { DayView } from './dayView';

export class Calendar {
    public currentDate: Date;
    private viewMode: 'day' | 'week' | 'month';
    private calendarElement: HTMLElement;
    private monthYearElement: HTMLElement;

    private monthView: MonthView;
    private weekView: WeekView;
    private dayView: DayView;

    constructor() {
        this.currentDate = new Date();
        this.viewMode = 'month'; // Default view mode
        this.calendarElement = document.getElementById('calendar') as HTMLElement;
        this.monthYearElement = document.getElementById('month-year') as HTMLElement;

        // Check if elements are present
        if (!this.calendarElement || !this.monthYearElement) {
            throw new Error("Required DOM elements not found");
        }

        this.monthView = new MonthView(this.calendarElement, this);
        this.weekView = new WeekView(this.calendarElement, this);
        this.dayView = new DayView(this.calendarElement, this);
        this.initialize();
    }

    public changeView(mode: 'day' | 'week' | 'month') {
        this.viewMode = mode;
        this.updateCalendar();
    }

    public setCurrentDate(date: Date) {
        this.currentDate = date;
        this.updateCalendar();
    }

    public updateCalendar() {
        this.monthYearElement.textContent = `${this.currentDate.toLocaleString('default', { month: 'long' })} ${this.currentDate.getFullYear()}`;
        this.showLoader();
        setTimeout(() => {
            this.hideLoader();
            if (this.viewMode === 'month') {
                this.monthView.render();
            } else if (this.viewMode === 'week') {
                this.weekView.render();
            } else if (this.viewMode === 'day') {
                this.dayView.render();
            }
        }, 2000); // Simulate loading time
    }

    private changeMonth(delta: number) {
        this.currentDate.setMonth(this.currentDate.getMonth() + delta);
        this.updateCalendar();
    }

    private searchDate() {
        const input = (document.getElementById('search-date') as HTMLInputElement).value;
        if (input) {
            const date = new Date(input);
            if (!isNaN(date.getTime())) {
                this.setCurrentDate(date);
            }
        }
    }

    private showLoader() {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.remove('hidden');
    }

    private hideLoader() {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
    }

    public getViewMode(): 'day' | 'week' | 'month' {
        return this.viewMode;
    }

    private initialize() {
        const prevMonthButton = document.getElementById('prev-month');
        const nextMonthButton = document.getElementById('next-month');
        const viewDayButton = document.getElementById('view-day');
        const viewWeekButton = document.getElementById('view-week');
        const viewMonthButton = document.getElementById('view-month');
        const searchButton = document.getElementById('search-button');

        if (prevMonthButton) prevMonthButton.addEventListener('click', () => this.changeMonth(-1));
        if (nextMonthButton) nextMonthButton.addEventListener('click', () => this.changeMonth(1));
        if (viewDayButton) viewDayButton.addEventListener('click', () => this.changeView('day'));
        if (viewWeekButton) viewWeekButton.addEventListener('click', () => this.changeView('week'));
        if (viewMonthButton) viewMonthButton.addEventListener('click', () => this.changeView('month'));
        if (searchButton) searchButton.addEventListener('click', () => this.searchDate());

        this.updateCalendar(); // Initial render
    }
}

