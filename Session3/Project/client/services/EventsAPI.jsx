// EventsAPI.jsx

const API_URL = "/api/events";

export const getAllEvents = async () => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
};

export const getEventsById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
};

export const getEventsByLocationSlug = async (slug) => {
    try {
        const response = await fetch(`/api/locations/${slug}/events`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
};

export default { getAllEvents, getEventsById, getEventsByLocationSlug };
