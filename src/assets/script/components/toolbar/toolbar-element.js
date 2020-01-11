import AppConfig from "../../config/AppConfig.js";

class ToolbarElement extends HTMLElement {

    constructor() {
        super();
        this.root = this.attachShadow({mode: 'open'})
    }

    set toolbar(toolbar) {
        let template = `
        <style>
        * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }
        :host {
            display: block;
        }
        .flex-container {
            padding: 16px 32px;
            background-color: ${AppConfig.themeColor};
            color: white;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            display: flex;
            overflow: auto;
        }
        
        .flex-container::-webkit-scrollbar {
            display: none;
        }
        
        .flex-container > nav {
            margin: auto 0 auto auto;
        }
        
        .flex-container > nav > ul {
            white-space: nowrap;
        }
        
        .flex-container > nav > ul > li {
            margin-left: 16px;
        }
        
        .flex-container > nav > ul > li:first-of-type {
            margin-left: 0;
        }
        
        .flex-container a {
            color: white;
            text-decoration: none;
        }
        
        .flex-container > nav > ul > li {
            display: inline;
        }
        
        @media screen and (max-width: 870px){
            .flex-container > h2 {
                flex-basis: 50%;
            }
        }
        
        @media screen and (max-width: 600px){
            .flex-container {
                flex-direction: column;
            }
        
            .flex-container > h2 {
                justify-content: center;
                margin: auto;
            }
        
            .flex-container > nav {
                margin: 20px auto 0 auto;
            }
        }
        </style>
        
        <div class="flex-container">
            <h2>${toolbar.appName}</h2>
            <nav>
                <ul>`;
        if(toolbar.navigations) {
            toolbar.navigations.forEach(navigation => {
                template += `
                    <li><a href="${navigation.path}">${navigation.name}</a></li>
            `
            });
        }

        template += `
               </ul>
            </nav>
            </div>
        `;

        this.root.innerHTML = template;
    }
}

customElements.define("toolbar-element", ToolbarElement);