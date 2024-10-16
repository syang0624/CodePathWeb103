const API_URL = "http://localhost:3000/api/cars"; // Full URL to backend

export const getAllCars = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch cars");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching cars:", error);
    }
};

// Get a car by ID
export const getCarById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching car by ID:", error);
    }
};

// Create a new car
export const createCar = async (car) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(car),
        });
        return await response.json();
    } catch (error) {
        console.error("Error creating car:", error);
    }
};

// Update an existing car
export const updateCar = async (id, car) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(car),
        });
        return await response.json();
    } catch (error) {
        console.error("Error updating car:", error);
    }
};

// Delete a car by ID
export const deleteCar = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
};

export default { getAllCars, getCarById, createCar, updateCar, deleteCar };
