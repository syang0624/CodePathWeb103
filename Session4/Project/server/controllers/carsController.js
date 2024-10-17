import { pool } from "../config/database.js"; // Correct database connection

// Create a new custom car
export const createCar = async (req, res) => {
    const {
        name,
        is_convertible,
        exterior_id,
        wheels_id,
        roof_id,
        interior_id,
        total_price,
    } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO custom_cars (name, is_convertible, exterior_id, wheels_id, roof_id, interior_id, total_price) 
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [
                name,
                is_convertible,
                exterior_id,
                wheels_id,
                roof_id,
                interior_id,
                total_price,
            ]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create custom car" });
    }
};

// Get all custom cars with their option details
export const getAllCars = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT cc.*, 
                   e.name AS exterior, 
                   w.name AS wheels, 
                   r.name AS roof, 
                   i.name AS interior
            FROM custom_cars cc
            JOIN options e ON cc.exterior_id = e.id
            JOIN options w ON cc.wheels_id = w.id
            JOIN options r ON cc.roof_id = r.id
            JOIN options i ON cc.interior_id = i.id
        `);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching custom cars:", error);
        res.status(500).json({ message: "Failed to fetch custom cars" });
    }
};

// Get a custom car by ID
export const getCarById = async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        return res
            .status(400)
            .json({ message: "Invalid ID format, ID must be a number" });
    }

    try {
        const result = await pool.query(
            `
            SELECT cc.*, 
                   e.name AS exterior, 
                   w.name AS wheels, 
                   r.name AS roof, 
                   i.name AS interior
            FROM custom_cars cc
            JOIN options e ON cc.exterior_id = e.id
            JOIN options w ON cc.wheels_id = w.id
            JOIN options r ON cc.roof_id = r.id
            JOIN options i ON cc.interior_id = i.id
            WHERE cc.id = $1
        `,
            [parseInt(id)]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Custom car not found" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error fetching custom car by ID:", error);
        res.status(500).json({ message: "Failed to fetch custom car" });
    }
};

// Update a custom car by ID
export const updateCar = async (req, res) => {
    const { id } = req.params;
    const {
        name,
        is_convertible,
        exterior_id,
        wheels_id,
        roof_id,
        interior_id,
        total_price,
    } = req.body;
    try {
        const result = await pool.query(
            `
            UPDATE custom_cars 
            SET name = $1, is_convertible = $2, exterior_id = $3, wheels_id = $4, roof_id = $5, interior_id = $6, total_price = $7 
            WHERE id = $8 
            RETURNING *`,
            [
                name,
                is_convertible,
                exterior_id,
                wheels_id,
                roof_id,
                interior_id,
                total_price,
                id,
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Custom car not found" });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update custom car" });
    }
};

// Delete a custom car by ID
export const deleteCar = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            "DELETE FROM custom_cars WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Custom car not found" });
        }
        res.status(200).json({ message: "Custom car deleted successfully" });
    } catch (error) {
        console.error("Error deleting custom car:", error);
        res.status(500).json({ message: "Failed to delete custom car" });
    }
};
