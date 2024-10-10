import { pool } from "../config/database.js";

// Get all events
export const getAllEvents = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM events");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get events by location ID
export const getEventsByLocation = async (req, res) => {
    const locationId = req.params.locationId;
    try {
        const result = await pool.query(
            "SELECT * FROM events WHERE location_id = $1",
            [locationId]
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(
            `Error fetching events for location ${locationId}:`,
            error
        );
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get a single event by ID
export const getEventById = async (req, res) => {
    const eventId = req.params.id;
    try {
        const result = await pool.query("SELECT * FROM events WHERE id = $1", [
            eventId,
        ]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: "Event not found" });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
        console.error(`Error fetching event with ID ${eventId}:`, error);
        res.status(500).json({ error: "Internal server error" });
    }
};
