import { pool } from "../config/database.js";

export const getLocations = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM locations");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch locations" });
    }
};

export const getLocationById = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM locations WHERE id = $1",
            [req.params.id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch location" });
    }
};
