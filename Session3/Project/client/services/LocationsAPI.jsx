const API_BASE_URL = "/api/events";

export const getAllLocations = async () => {
    try {
        const response = await fetch(API_BASE_URL);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
};

export const getLocationById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
};

export default { getAllLocations, getLocationById };
