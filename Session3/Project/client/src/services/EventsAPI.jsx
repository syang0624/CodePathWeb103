// client/src/services/EventsAPI.js
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api"; // Adjust if your server runs on a different port or path

export const getAllEvents = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/events`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all events:", error);
        throw error;
    }
};

export const getEventsByLocation = async (locationId) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/events/location/${locationId}`
        );
        return response.data;
    } catch (error) {
        console.error(
            `Error fetching events for location ${locationId}:`,
            error
        );
        throw error;
    }
};

export const getEventById = async (eventId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/events/${eventId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching event with ID ${eventId}:`, error);
        throw error;
    }
};
