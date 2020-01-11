import AppConfig from "../../config/AppConfig";

class SearchElement extends HTMLElement {
    constructor() {
        super();

        this.root = this.attachShadow({mode: "closed"});
        this.root.style = document.createElement("style");
        this.root.style.textContent = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            .search-bar {
                max-width: 800px;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                padding: 16px;
                border-radius: 5px;
                display: flex;
                position: sticky;
                top: 10px;
                background-color: white;
            }
            
            .search-bar > input {
                width: 75%;
                padding: 16px;
                border: 0;
                border-bottom: 1px solid ${AppConfig.themeColor};
                font-weight: bold;
                -webkit-appearance: textfield; /* fix styling for safari */
            }
            
            .search-bar > input:focus {
                outline: 0;
                border-bottom: 2px solid ${AppConfig.themeColor};
            }
            
            .search-bar > input:focus::placeholder {
                font-weight: bold;
            }
            
            .search-bar > input::placeholder {
                color: ${AppConfig.themeColor};
                font-weight: normal;
            }
            
            .search-bar > button {
                width: 23%;
                cursor: pointer;
                margin-left: auto;
                padding: 16px;
                background-color: ${AppConfig.themeColor};
                color: ${AppConfig.textThemeColor};
                border: 0;
                text-transform: uppercase;
            }
            
            @media screen and (max-width: 550px){
                .search-bar {
                    flex-direction: column;
                    position: static;
                }
            
                .search-bar > input {
                    width: 100%;
                    margin-bottom: 12px;
                }
            
                .search-bar > button {
                    width: 100%;
                }
            }
        `;

        this.root.searchBarContainer = document.createElement("div");
        this.root.searchBarContainer.setAttribute("class", "search-bar");

        this.root.inputElement = document.createElement("input");
        this.root.inputElement.type = "search";
        this.root.inputElement.placeholder = "News Keyword";

        this.root.buttonElement = document.createElement("button");
        this.root.buttonElement.textContent = "Search";

        this.root.searchBarContainer.appendChild(this.root.inputElement);
        this.root.searchBarContainer.appendChild(this.root.buttonElement);

        this.root.appendChild(this.root.style);
        this.root.appendChild(this.root.searchBarContainer);
    }

    set clickEvent(event) {
        this.root.buttonElement.addEventListener("click", event);
    }

    get value() {
        return this.root.inputElement.value;
    }
}

customElements.define("search-element", SearchElement);