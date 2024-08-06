import { data } from "../data/data.js";
import {eventsStatics, eventsUpcomingEventsStaticsByCategory, eventsPastEventsStaticsByCategory} from "../modules/constants.js";
import {getHighestPercentajeAssistanceEvent, getLowestPercentajeAssistanceEvent, getLargerCapacityEvent, getStatisticsByCategoryUpcomingEvents, getStatisticsByCategoryPastEvents, showEventsTableEventsStatics, showRowEventsStaticsByCategory} from "../modules/functions.js";

let events = data.events;
let currentDate = data.currentDate;

let highestPercentajeAssistanceEventData = getHighestPercentajeAssistanceEvent(events);
let lowestPercentajeAssistanceEventData = getLowestPercentajeAssistanceEvent(events);
let largerCapacityEventData = getLargerCapacityEvent(events);
let upcomingEventsByCategory = getStatisticsByCategoryUpcomingEvents(events, currentDate);
let pastEventsByCategory = getStatisticsByCategoryPastEvents(events, currentDate);

showEventsTableEventsStatics(events, eventsStatics, highestPercentajeAssistanceEventData, lowestPercentajeAssistanceEventData, largerCapacityEventData);
showRowEventsStaticsByCategory(upcomingEventsByCategory, eventsUpcomingEventsStaticsByCategory);
showRowEventsStaticsByCategory(pastEventsByCategory, eventsPastEventsStaticsByCategory);