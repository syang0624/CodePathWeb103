import { pool } from "../config/database.js"; // Correct database connection

// Create a new car
export const createCar = async (req, res) => {
    const { name, exterior, wheels, roof, interior, price } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO cars (name, exterior, wheels, roof, interior, price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [name, exterior, wheels, roof, interior, price]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create car" });
    }
};

// Get all cars
export const getAllCars = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM cars");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching cars:", error);
        res.status(500).json({ message: "Failed to fetch cars" });
    }
};

// Get a car by ID (already correct)
export const getCarById = async (req, res) => {
    const { id } = req.params;

    // Ensure the ID is a number
    if (isNaN(id)) {
        return res
            .status(400)
            .json({ message: "Invalid ID format, ID must be a number" });
    }

    try {
        const result = await pool.query("SELECT * FROM cars WHERE id = $1", [
            parseInt(id),
        ]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Car not found" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error fetching car by ID:", error);
        res.status(500).json({ message: "Failed to fetch car" });
    }
};

// Update a car by ID (already correct)
export const updateCar = async (req, res) => {
    const { id } = req.params;
    const { name, exterior, wheels, roof, interior, price } = req.body;
    try {
        const result = await pool.query(
            "UPDATE cars SET name = $1, exterior = $2, wheels = $3, roof = $4, interior = $5, price = $6 WHERE id = $7 RETURNING *",
            [name, exterior, wheels, roof, interior, price, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Car not found" });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update car" });
    }
};

// Delete a car by ID (corrected to query the database)
export const deleteCar = async (req, res) => {
    const { id } = req.params; // Get the ID from the URL params
    try {
        const result = await pool.query(
            "DELETE FROM cars WHERE id = $1 RETURNING *",
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Car not found" });
        }
        res.status(200).json({ message: "Car deleted successfully" });
    } catch (error) {
        console.error("Error deleting car:", error);
        res.status(500).json({ message: "Failed to delete car" });
    }
};
