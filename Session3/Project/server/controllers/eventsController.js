import { pool } from "../config/database.js";

export const getEvents = async (req, res) => {
    try {
        const result = await pool.query(`
      SELECT events.id, events.title, events.date, events.time, events.image, locations.name AS location
      FROM events
      JOIN locations ON events.location_id = locations.id;
    `);
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching events:", err);
        res.status(500).json({ error: "Failed to fetch events" });
    }
};

export const getEventById = async (req, res) => {
    try {
        const result = await pool.query(
            `
      SELECT events.id, events.title, events.date, events.time, events.image, locations.name AS location
      FROM events
      JOIN locations ON events.location_id = locations.id
      WHERE events.id = $1;
    `,
            [req.params.id]
        );

        res.json(result.rows[0]);
    } catch (err) {
        console.error("Failed to fetch event by ID:", err);
        res.status(500).json({ error: "Failed to fetch event" });
    }
};

export const getEventsByLocationSlug = async (req, res) => {
    try {
        const locationSlug = req.params.slug;

        const locationResult = await pool.query(
            "SELECT * FROM locations WHERE LOWER(REPLACE(name, ' ', '')) = $1",
            [locationSlug]
        );

        if (locationResult.rows.length === 0) {
            return res.status(404).json({ error: "Location not found" });
        }

        const location = locationResult.rows[0];

        const eventResult = await pool.query(
            "SELECT * FROM events WHERE location_id = $1",
            [location.id]
        );

        res.json({
            location,
            events: eventResult.rows,
        });
    } catch (err) {
        console.error("Error fetching events by location:", err);
        res.status(500).json({ error: "Failed to fetch events by location" });
    }
};
