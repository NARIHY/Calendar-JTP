// MenuManager.ts
export class MenuManager {
    constructor() {
        this.initMenus();
    }

    initMenus(): void {
        this.createTopMenu();
        this.createSideMenu();
        this.createFooter();
    }

    // Méthode pour créer et injecter le menu du haut
    createTopMenu(): void {
        const topMenu = document.createElement('div');
        topMenu.className = 'top-menu';
        topMenu.innerHTML = `
            <ul>
                <li><a href="#">Menu 1</a></li>
                <li><a href="#">Menu 2</a></li>
                <li><a href="#">Menu 3</a></li>
            </ul>
        `;
        const targetTopMenu = document.getElementById('top-menu-container');
        if (targetTopMenu) {
            targetTopMenu.appendChild(topMenu);
        }
    }

    // Méthode pour créer et injecter le menu latéral
    createSideMenu(): void {
        const sideMenu = document.createElement('div');
        sideMenu.className = 'side-menu';
        sideMenu.innerHTML = `
            <ul>
                <li><a href="#">Item 1</a></li>
                <li><a href="#">Item 2</a></li>
                <li><a href="#">Item 3</a></li>
            </ul>
        `;
        const targetSideMenu = document.getElementById('side-menu-container');
        if (targetSideMenu) {
            targetSideMenu.appendChild(sideMenu);
        }
    }

    // Méthode pour créer et injecter le pied de page
    createFooter(): void {
        const footer = document.createElement('div');
        footer.className = 'footer';
        footer.innerHTML = `
            <p>@copyright 2024 | NARIHY</p>
        `;
        const targetFooter = document.getElementById('footer-container');
        if (targetFooter) {
            targetFooter.appendChild(footer);
        }
    }
}
