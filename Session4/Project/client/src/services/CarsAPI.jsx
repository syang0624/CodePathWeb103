export const fetchAllCars = async () => {
    try {
        const response = await fetch("/api/cars");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const cars = await response.json();
        return cars;
    } catch (error) {
        console.error("Error fetching  cars:", error);
        throw error;
    }
};

export const fetchCarById = async (id) => {
    try {
        const response = await fetch(`/api/cars/${id}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const car = await response.json();
        return car;
    } catch (error) {
        console.error("Error fetching  car:", error);
        throw error;
    }
};

export const createCar = async (carData) => {
    try {
        const response = await fetch("/api/cars", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(carData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Network response was not ok: ${errorData.error}`);
        }
        const newCar = await response.json();
        return newCar;
    } catch (error) {
        console.error("Error creating  car:", error);
        throw error;
    }
};

export const updateCar = async (id, carData) => {
    try {
        const response = await fetch(`/api/cars/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(carData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Network response was not ok: ${errorData.error}`);
        }
        const updatedCar = await response.json();
        return updatedCar;
    } catch (error) {
        console.error("Error updating  car:", error);
        throw error;
    }
};

export const deleteCar = async (id) => {
    try {
        const response = await fetch(`/api/cars/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Network response was not ok: ${errorData.error}`);
        }
        return;
    } catch (error) {
        console.error("Error deleting  car:", error);
        throw error;
    }
};
