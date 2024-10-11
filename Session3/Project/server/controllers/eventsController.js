import { pool } from "../config/database.js";

export const getEvents = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM events");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

export const getEventsById = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM events WHERE id = $1", [
            req.params.id,
        ]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
