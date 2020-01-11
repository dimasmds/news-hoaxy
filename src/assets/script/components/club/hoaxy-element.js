import AppConfig from "../../config/AppConfig";

class HoaxyElement extends HTMLElement {

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
            :host {
                display: block;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                border-radius: 10px;
                overflow: hidden;
            }
            
            .hoaxy-info {
                padding: 24px;
            }
            
            .hoaxy-info > h2 {
                font-weight: lighter;
                color: ${AppConfig.themeColor}
            }
            
            .hoaxy-info > h2 > a {
                text-decoration: none;
                color: parent;
            }
            
            .hoaxy-info > p {
                margin-top: 10px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 10; /* number of lines to show */
            
            }
        `;


        this.root.hoaxyInfoElement = document.createElement("div");
        this.root.hoaxyInfoElement.setAttribute("class", "hoaxy-info");

        this.root.hoaxyTitleElement = document.createElement("h2");
        this.root.hoaxyLinkElement = document.createElement("a");
        this.root.hoaxyDomainElement = document.createElement("p");
        this.root.hoaxyDateElement = document.createElement("p");
        this.root.hoaxyNumberOfTweets = document.createElement("p");
        this.root.hoaxySiteType = document.createElement("p");

        this.root.hoaxyTitleElement.appendChild(this.root.hoaxyLinkElement);

        this.root.hoaxyInfoElement.appendChild(this.root.hoaxyTitleElement);
        this.root.hoaxyInfoElement.appendChild(this.root.hoaxyDomainElement);
        this.root.hoaxyInfoElement.appendChild(this.root.hoaxyDateElement);
        this.root.hoaxyInfoElement.appendChild(this.root.hoaxyNumberOfTweets);
        this.root.hoaxyInfoElement.appendChild(this.root.hoaxySiteType);

        this.root.appendChild(this.root.style);
        this.root.appendChild(this.root.hoaxyInfoElement);
    }

    set hoaxy(hoaxy) {
        this.root.hoaxyLinkElement.textContent = hoaxy.title;
        this.root.hoaxyLinkElement.href = hoaxy.canoncialUrl;
        this.root.hoaxyLinkElement.target = "_blank";
        this.root.hoaxyDomainElement.textContent = "Domain: " + hoaxy.domain;
        this.root.hoaxyDateElement.textContent = `Date ${hoaxy.datePublished}`;
        this.root.hoaxyNumberOfTweets.textContent = `Tweets count: ${hoaxy.numberOfTweets}`;
        this.root.hoaxySiteType.textContent = `Site type: ${hoaxy.siteType}`;
    }
}

customElements.define("hoaxy-element", HoaxyElement);