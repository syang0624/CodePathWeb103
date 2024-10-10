// controllers/locationsController.js
import { pool } from "../config/database.js";

// Get all locations
export const getAllLocations = async (req, res) => {
    try {
        console.log("Attempting to fetch all locations");
        const result = await pool.query("SELECT * FROM locations");
        console.log("Locations fetched:", result.rows);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching locations:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get a single location by ID
export const getLocationById = async (req, res) => {
    const locationId = req.params.id;
    try {
        const result = await pool.query(
            "SELECT * FROM locations WHERE id = $1",
            [locationId]
        );
        if (result.rows.length === 0) {
            res.status(404).json({ error: "Location not found" });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
        console.error(`Error fetching location with ID ${locationId}:`, error);
        res.status(500).json({ error: "Internal server error" });
    }
};
