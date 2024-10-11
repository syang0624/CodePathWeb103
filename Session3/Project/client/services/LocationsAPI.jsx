const API_URL = "/api/locations";

export const getAllLocations = async () => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
};

export const getLocationById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
};

export default { getAllLocations, getLocationById };
