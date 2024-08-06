let urlAPI = "https://aulamindhub.github.io/amazing-api/events.json";

export async function getEvents() {
    return fetch(urlAPI)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => console.log(error));
}

export const data = await getEvents();