import express from "express";
import {
    getEvents,
    getEventById,
    getEventsByLocationSlug,
} from "../controllers/eventsController.js";

const router = express.Router();

router.get("/events", getEvents);
router.get("/events/:id", getEventById);
router.get("/locations/:slug/events", getEventsByLocationSlug);

export default router;
