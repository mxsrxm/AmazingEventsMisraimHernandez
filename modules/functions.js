export function showEvents(dataFiltrada, container_cards) {
    let cardsHTML = "";

    if (dataFiltrada.length > 0) {
        for (let i = 0; i < dataFiltrada.length; i++) {
            cardsHTML += createCard(dataFiltrada[i]);
        }

        container_cards.innerHTML = cardsHTML;

    } else {
        container_cards.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="d-none">
                <symbol id="exclamation-triangle-fill" viewBox="0 0 16 16">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </symbol>
            </svg>

            <div class="alert alert-danger d-flex align-items-center" role="alert">
                <svg class=" bi flex-shrink-0 me-2" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                <div>
                    No events found to show
                </div>
            </div>
        `;
    }
}

export function showCheckBoxCategory(arrayToProcess, container_checkbox_category) {
    let ckBoxCategoryHTML = "";

    if (arrayToProcess.length > 0) {

        let categoriesFromEvents = arrayToProcess.map(event => event.category);
        let categoriesWithoutDuplicates = [...new Set(categoriesFromEvents)];

        for (let i = 0; i < categoriesWithoutDuplicates.length; i++) {
            ckBoxCategoryHTML += createCheckBoxCategory(categoriesWithoutDuplicates[i]);
        }

        container_checkbox_category.innerHTML = ckBoxCategoryHTML;
    }
}

function createCard(event) {

    let id = event._id;
    let url = new URLSearchParams({ _id: id });

    let cardHTML = `  
        <div id="${event._id}" class="card m-3">

            <img src="${event.image}" class="card-img-top w-100 h-50 object-fit-cover" alt="${event.name}">

            <div class="card-body text-center">
                <h5 class="card-title">${event.name}</h5>
                <p class="card-text">${event.description}</p>
            </div>

            <div class=" d-flex justify-content-around">
                <div class="">
                    <p class="fw-semibold fs-5">Price: <span class="text-success fw-bold fs-5"> $${event.price} </span></p>
                </div>

                <div class="">
                    <a class="btn btn-primary" href="../pages/details.html?${url}">Details</a>
                </div>
            </div>

        </div>
    `;

    return cardHTML;
}

function createCheckBoxCategory(category) {
    let checkboxCategoryHTML = `
        <div class="form-check me-4">
            <input class="form-check-input" type="checkbox" value="" id="filter-check-${category}">
            <label class="form-check-label fw-semibold" for="filter-check-${category}">
                ${category}
            </label>
        </div>
    `;

    return checkboxCategoryHTML;
}

export function filterSearchEvents(data, searchText) {
    let eventsFiltered = data.filter(event =>
        event.name.toLowerCase().includes(searchText)
        ||
        event.description.toLowerCase().includes(searchText)
    )

    return eventsFiltered;
}

export function filterCheckBoxCategory(data, container_checkbox_category) {
    let checkboxes = container_checkbox_category.querySelectorAll("input[type=checkbox]:checked");
    let categories = [];

    if (checkboxes.length === 0) {
        return data;
    }

    checkboxes.forEach(checkbox => {
        categories.push(checkbox.id.split("-")[2]);
    });

    console.log(categories);

    let eventsFiltered = data.filter(event =>
        categories.includes(event.category)
    );

    return eventsFiltered;
}

export function showCardDetails(id, dataFromOrigin, container) {
    let cardsDetailsHTML = "";

    let evenTfinded = dataFromOrigin.events.find((event) => event._id === id);

    console.log("ID", id);
    console.log("evenTfinded", evenTfinded);

    if (evenTfinded) {
        cardsDetailsHTML = createCardDetails(evenTfinded);


    } else {
        cardsDetailsHTML += `<h2 class="text-center">No event found, no exist.</h2>`;
    }

    container.innerHTML = cardsDetailsHTML;
}

function createCardDetails(eventToCreate) {
    let cardDetailsHTML = `
            <div class="card mb-3 w-75 h-100" id="${eventToCreate._id}">
                <div class="row g-0">

                    <div class="col-md-6">
                        <img src="${eventToCreate.image}" class="img-fluid rounded-start h-100 w-100 object-fit-cover" alt="Event Image">
                    </div>

                    <div class="col-md-6">
                        <div class="card-body d-flex flex-column justify-content-center h-100 w-100">
                            <h2 class="card-title d-flex justify-content-center text-info-emphasis">${eventToCreate.name}</h2>
                            <p class="card-text text-center fs-4">${eventToCreate.description}</p>
                            <div class="d-flex">
                                <p class="card-text fs-5 mx-3">Date:<span class="mx-4">${eventToCreate.date}</span></p>
                            </div>
                            <div class="d-flex">
                                <p class="card-text fs-5 mx-3">Category:<span class="mx-4">${eventToCreate.category}</span></p>
                            </div>
                            <div class="d-flex">
                                <p class="card-text fs-5 mx-3">Place:<span class="mx-4">${eventToCreate.place}</span></p>
                            </div>
                            <div class="d-flex">
                                <p class="card-text fs-5 mx-3">Capacity:<span class="mx-4">${eventToCreate.capacity}</span></p>
                            </div>

                            ${eventToCreate.assistance ?
                                `
                                    <div id="assistance" class="d-flex">
                                        <p class="card-text fs-5 mx-3">Assistance:<span class="mx-4">${eventToCreate.assistance}</span></p>
                                    </div>
                                `
                            :
                                ""
                            }

                            ${eventToCreate.estimate ?
                            `
                                <div id="estimate" class="d-flex">
                                    <p class="card-text fs-5 mx-3">Estimate:<span class="mx-4">${eventToCreate.estimate}</span></p>
                                </div>
                            `
                            :
                                ""
                            }

                            <p class="fw-semibold fs-5 d-flex justify-content-center mt-3">Price: <span class="text-success mx-3"> $${eventToCreate.price} </span></p>
                        
                        </div>
                    </div>
                </div>
            </div>
        `;
    return cardDetailsHTML;
}

export function getHighestPercentajeAssistanceEvent(events) {
    let highestPercentajeAssistanceEventValue = 0;
    let highestPercentajeAssistanceEventName = "";

    for (let i = 0; i < events.length; i++) {
        let event = events[i];
        let percentajeAssistance = event.assistance / event.capacity * 100;

        if (percentajeAssistance > highestPercentajeAssistanceEventValue) {
            highestPercentajeAssistanceEventValue = percentajeAssistance;
            highestPercentajeAssistanceEventName = event.name;
        }
    }

    highestPercentajeAssistanceEventValue = highestPercentajeAssistanceEventValue.toFixed(2);

    return {
        highestPercentajeAssistanceEventValue,
        highestPercentajeAssistanceEventName
    };
}

export function getLowestPercentajeAssistanceEvent(events) {
    let lowestPercentajeAssistanceEventValue = Infinity;
    let lowestPercentajeAssistanceEventName = "";

    for (let i = 0; i < events.length; i++) {
        let event = events[i];
        let percentajeAssistance = event.assistance / event.capacity * 100;

        if (percentajeAssistance < lowestPercentajeAssistanceEventValue) {
            lowestPercentajeAssistanceEventValue = percentajeAssistance;
            lowestPercentajeAssistanceEventName = event.name;
        }
    }

    return {
        lowestPercentajeAssistanceEventValue,
        lowestPercentajeAssistanceEventName
    };

}

export function getLargerCapacityEvent(events) {
    let largerCapacityEvent = 0;
    let largerCapacityEventName = "";

    for (let i = 0; i < events.length; i++) {
        let event = events[i];

        if (event.capacity > largerCapacityEvent) {
            largerCapacityEvent = event.capacity;
            largerCapacityEventName = event.name;
        }
    }

    return {
        largerCapacityEvent,
        largerCapacityEventName
    };
}

function createRowEventsStatics(highestData, lowestData, largerData) {
    let rowHTML = `
        <tr>
            <td class="text-center fs-5 fw-semibold text-info-emphasis" >${highestData.highestPercentajeAssistanceEventName} <br> ${highestData.highestPercentajeAssistanceEventValue}%</td>
            <td class="text-center fs-5 fw-semibold text-info-emphasis" >${lowestData.lowestPercentajeAssistanceEventName} <br> ${lowestData.lowestPercentajeAssistanceEventValue}%</td>
            <td class="text-center fs-5 fw-semibold text-info-emphasis" >${largerData.largerCapacityEventName} <br> ${largerData.largerCapacityEvent}</td>
        </tr>
    `;

    return rowHTML;

}

export function showEventsTableEventsStatics(events, container, highestData, lowestData, largerData) {

    let rowsHTML = "";

    if (events.length > 0) {
        rowsHTML += createRowEventsStatics(highestData, lowestData, largerData);
        container.innerHTML = rowsHTML;

    } else {
        container.innerHTML = `
            <h3 class="text-center">No events found.</h3>
        `;
    }
}

export function getStatisticsByCategoryUpcomingEvents(eventsData, dateData) {
    let categories = eventsData.map(event => event.category);
    categories = categories.filter((category, index) => categories.indexOf(category) === index);

    let upcomingEventsByCategory = [];

    for (let i = 0; i < categories.length; i++) {
        let category = categories[i];
        let eventsByCategory = eventsData.filter(event => event.category === category);

        let upcomingEvents = eventsByCategory.filter(event => event.date > dateData);

        let contEvent = 0;

        let revenuePerEvent = 0;
        let revenuePerEventSuma = 0;

        let percentajeEstimateAssistance = 0;
        let percentajeEstimateAssistanceTotal = 0;

        let revenueAverage = 0;
        let percentajeEstimateAssistanceAverage = 0;


        for (let i = 0; i < upcomingEvents.length; i++) {
            let event = upcomingEvents[i];

            contEvent++;

            revenuePerEvent = event.price * event.estimate;
            revenuePerEventSuma += revenuePerEvent;

            percentajeEstimateAssistance = event.estimate / event.capacity * 100;
            percentajeEstimateAssistanceTotal += percentajeEstimateAssistance;
        }

        revenuePerEventSuma = revenuePerEventSuma.toFixed(2);

        revenueAverage = revenuePerEventSuma / contEvent;
        revenueAverage = revenueAverage.toFixed(2);

        percentajeEstimateAssistanceAverage = percentajeEstimateAssistanceTotal / contEvent;
        percentajeEstimateAssistanceAverage = percentajeEstimateAssistanceAverage.toFixed(2);

        upcomingEventsByCategory.push({
            category,
            revenuePerEventSuma,
            revenueAverage,
            percentajeEstimateAssistanceAverage
        });
    }

    return upcomingEventsByCategory;
}

export function getStatisticsByCategoryPastEvents(eventsData, dateData) {
    let categories = eventsData.map(event => event.category);
    categories = categories.filter((category, index) => categories.indexOf(category) === index);

    let pastEventsByCategory = [];

    for (let i = 0; i < categories.length; i++) {
        let category = categories[i];
        let eventsByCategory = eventsData.filter(event => event.category === category);

        let upcomingEvents = eventsByCategory.filter(event => event.date < dateData);

        let contEvent = 0;

        let revenuePerEvent = 0;
        let revenuePerEventSuma = 0;

        let percentajeEstimateAssistance = 0;
        let percentajeEstimateAssistanceTotal = 0;

        let revenueAverage = 0;
        let percentajeEstimateAssistanceAverage = 0;


        for (let i = 0; i < upcomingEvents.length; i++) {
            let event = upcomingEvents[i];

            contEvent++;

            revenuePerEvent = event.price * event.assistance;
            revenuePerEventSuma += revenuePerEvent;

            percentajeEstimateAssistance = event.assistance / event.capacity * 100;
            percentajeEstimateAssistanceTotal += percentajeEstimateAssistance;
        }

        revenuePerEventSuma = revenuePerEventSuma.toFixed(2);

        revenueAverage = revenuePerEventSuma / contEvent;
        revenueAverage = revenueAverage.toFixed(2);

        percentajeEstimateAssistanceAverage = percentajeEstimateAssistanceTotal / contEvent;
        percentajeEstimateAssistanceAverage = percentajeEstimateAssistanceAverage.toFixed(2);

        pastEventsByCategory.push({
            category,
            revenuePerEventSuma,
            revenueAverage,
            percentajeEstimateAssistanceAverage
        });
    }

    return pastEventsByCategory;
}

function createRowEventsStaticsByCategory(eventsStaticsByCategory) {
    let rowHTML = `
        <tr>
            <td class="text-center fs-6 fw-semibold text-secondary-emphasis" >${eventsStaticsByCategory.category}</td>
            <td class="text-center fs-6 fw-semibold text-secondary-emphasis" >${eventsStaticsByCategory.revenuePerEventSuma > 0 ? `Total Revenues: $${eventsStaticsByCategory.revenuePerEventSuma} <br> Average Per Event: $${eventsStaticsByCategory.revenueAverage}` : "No data for category"}</td>            
            <td class="text-center fs-6 fw-semibold text-secondary-emphasis" >${eventsStaticsByCategory.percentajeEstimateAssistanceAverage > 0 ? `${eventsStaticsByCategory.percentajeEstimateAssistanceAverage}%` : "No data for category"}</td>
        </tr>
    `;
    return rowHTML;
}

export function showRowEventsStaticsByCategory(eventsStaticsByCategory, container) {
    let rowsHTML = "";

    for (let i = 0; i < eventsStaticsByCategory.length; i++) {
        rowsHTML += createRowEventsStaticsByCategory(eventsStaticsByCategory[i]);
    }

    container.innerHTML = rowsHTML;
}