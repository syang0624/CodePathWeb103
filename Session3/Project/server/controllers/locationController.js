import { pool } from "../config/database.js";

export const getLocation = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM locations");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

export const getLocationById = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM locations WHERE id = $1",
            [req.params.id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
