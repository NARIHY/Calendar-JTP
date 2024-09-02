là j'arrive pas a avoir mon calendrier, il y en a un gros bug, je sais pas il n'arrive pas a exporter le calendrier


Projet en cours.....


gros probleme sur le webpack je ne sais pas encore comment le résoudre mais il y a un enorme problème.

voici l'erreur:
Uncaught Error: Module parse failed: Unexpected token (7:11)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
| 
| export class Calendar {
>     public currentDate: Date;
|     private viewMode: 'day' | 'week' | 'month';
|     private calendarElement: HTMLElement;
    <anonymous> webpack:///./src/calendar.ts?:1
    ts http://127.0.0.1:5500/dist/app.js:29
    __webpack_require__ http://127.0.0.1:5500/dist/app.js:53
    <anonymous> webpack:///./src/app.ts?:2
    ts http://127.0.0.1:5500/dist/app.js:19
    __webpack_require__ http://127.0.0.1:5500/dist/app.js:53
    <anonymous> http://127.0.0.1:5500/dist/app.js:105
    <anonymous> http://127.0.0.1:5500/dist/app.js:107