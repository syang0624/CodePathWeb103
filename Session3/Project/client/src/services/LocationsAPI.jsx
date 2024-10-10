// client/src/services/LocationsAPI.js
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

export const getAllLocations = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/locations`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all locations:", error);
        throw error;
    }
};

export const getLocationById = async (locationId) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/locations/${locationId}`
        );
        return response.data;
    } catch (error) {
        console.error(`Error fetching location with ID ${locationId}:`, error);
        throw error;
    }
};
