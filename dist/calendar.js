"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calendar = void 0;
// calendar.ts
const monthView_1 = require("./monthView");
const weekView_1 = require("./weekView");
const dayView_1 = require("./dayView");
class Calendar {
    constructor() {
        this.currentDate = new Date();
        this.viewMode = 'month'; // Default view mode
        this.calendarElement = document.getElementById('calendar');
        this.monthYearElement = document.getElementById('month-year');
        // Check if elements are present
        if (!this.calendarElement || !this.monthYearElement) {
            throw new Error("Required DOM elements not found");
        }
        this.monthView = new monthView_1.MonthView(this.calendarElement, this);
        this.weekView = new weekView_1.WeekView(this.calendarElement, this);
        this.dayView = new dayView_1.DayView(this.calendarElement, this);
        this.initialize();
    }
    changeView(mode) {
        this.viewMode = mode;
        this.updateCalendar();
    }
    setCurrentDate(date) {
        this.currentDate = date;
        this.updateCalendar();
    }
    updateCalendar() {
        this.monthYearElement.textContent = `${this.currentDate.toLocaleString('default', { month: 'long' })} ${this.currentDate.getFullYear()}`;
        this.showLoader();
        setTimeout(() => {
            this.hideLoader();
            if (this.viewMode === 'month') {
                this.monthView.render();
            }
            else if (this.viewMode === 'week') {
                this.weekView.render();
            }
            else if (this.viewMode === 'day') {
                this.dayView.render();
            }
        }, 2000); // Simulate loading time
    }
    changeMonth(delta) {
        this.currentDate.setMonth(this.currentDate.getMonth() + delta);
        this.updateCalendar();
    }
    searchDate() {
        const input = document.getElementById('search-date').value;
        if (input) {
            const date = new Date(input);
            if (!isNaN(date.getTime())) {
                this.setCurrentDate(date);
            }
        }
    }
    showLoader() {
        const loader = document.getElementById('loader');
        if (loader)
            loader.classList.remove('hidden');
    }
    hideLoader() {
        const loader = document.getElementById('loader');
        if (loader)
            loader.classList.add('hidden');
    }
    getViewMode() {
        return this.viewMode;
    }
    initialize() {
        const prevMonthButton = document.getElementById('prev-month');
        const nextMonthButton = document.getElementById('next-month');
        const viewDayButton = document.getElementById('view-day');
        const viewWeekButton = document.getElementById('view-week');
        const viewMonthButton = document.getElementById('view-month');
        const searchButton = document.getElementById('search-button');
        if (prevMonthButton)
            prevMonthButton.addEventListener('click', () => this.changeMonth(-1));
        if (nextMonthButton)
            nextMonthButton.addEventListener('click', () => this.changeMonth(1));
        if (viewDayButton)
            viewDayButton.addEventListener('click', () => this.changeView('day'));
        if (viewWeekButton)
            viewWeekButton.addEventListener('click', () => this.changeView('week'));
        if (viewMonthButton)
            viewMonthButton.addEventListener('click', () => this.changeView('month'));
        if (searchButton)
            searchButton.addEventListener('click', () => this.searchDate());
        this.updateCalendar(); // Initial render
    }
}
exports.Calendar = Calendar;
