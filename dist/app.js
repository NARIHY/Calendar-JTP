"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//app.ts
const calendar_1 = require("./calendar");
//initialize the calendar when document is ready
document.addEventListener('DOMContentLoaded', () => {
    new calendar_1.Calendar();
});
