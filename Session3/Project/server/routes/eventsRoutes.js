// routes/eventsRoutes.js
import express from "express";
import {
    getAllEvents,
    getEventById,
    getEventsByLocation,
} from "../controllers/eventController.js";

const router = express.Router();

// Route to get all events
router.get("/", getAllEvents);

// Route to get events by location ID
router.get("/location/:locationId", getEventsByLocation);

// Route to get a single event by ID
router.get("/:id", getEventById);

export default router;
