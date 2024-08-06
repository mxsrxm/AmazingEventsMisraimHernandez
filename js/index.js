import {showEvents, showCheckBoxCategory, filterSearchEvents, filterCheckBoxCategory} from "../modules/functions.js";
import {data} from "../data/data.js";
import {container_checkbox_category, container_cards, filterSearch} from "../modules/constants.js";

data.events

let eventsFilteredByDate = data.events;

filterSearch.addEventListener("keyup", () => {    
    let eventsFiltered = filterSearchEvents(eventsFilteredByDate, filterSearch.value.toLowerCase());
    eventsFiltered = filterCheckBoxCategory(eventsFiltered, container_checkbox_category);
    showEvents(eventsFiltered, container_cards);
});

container_checkbox_category.addEventListener("click", () => {
    let eventsFiltered = filterCheckBoxCategory(eventsFilteredByDate, container_checkbox_category);
    eventsFiltered = filterSearchEvents(eventsFiltered, filterSearch.value.toLowerCase());
    showEvents(eventsFiltered, container_cards);
});

showCheckBoxCategory(eventsFilteredByDate, container_checkbox_category);
showEvents(eventsFilteredByDate, container_cards);