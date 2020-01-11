import "../components/hoaxy/hoaxy-element";
import "../components/toolbar/toolbar-element";
import "../components/search/search-element";
import AppConfig from "../config/AppConfig";
import {Config, Endpoint} from "../config/ApiConfig";
import Hoaxy from "../components/hoaxy/Hoaxy";

const main = function () {

    const fetchApi = (url) => {
        return fetch(url, {
            method: "GET",
            headers: {
                "X-RapidAPI-Host": Config.apiHost,
                "X-RapidAPI-Key" : Config.apiKey
            }
        })
            .then(response => {
                if (response.status !== 200) {
                    return Promise.reject([])
                }
                return Promise.resolve(response.json())
            })
    };


    const renderResult = results => {
        const clubListElement = document.querySelector("#newsList");
        clubListElement.innerHTML = "";
        console.log(results);
        if (results.articles) {
            results.articles.forEach(article => {
                const hoaxyElement = document.createElement("hoaxy-element");
                hoaxyElement.hoaxy = new Hoaxy(article.canonical_url, article.date_published, article.domain, article.id, article.number_of_tweets, article.score, article.site_type, article.title);
                clubListElement.appendChild(hoaxyElement);
            });
        } else {
            clubListElement.innerHTML = `<h2 class="placeholder">${results.error}</h2>`;
        }
    };

    document.addEventListener("DOMContentLoaded", function () {
        const toolbarElement = document.querySelector("toolbar-element");
        toolbarElement.toolbar = AppConfig;

        const searchElement = document.querySelector("search-element");

        searchElement.clickEvent = function () {
            fetchApi(Endpoint.searchNews(searchElement.value))
                .then(result => {
                    renderResult(result);
                })
                .catch(result => {
                    renderResult(result);
                })
        };
    })
};

export default main;
