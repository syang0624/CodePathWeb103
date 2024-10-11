import express from "express";
import { getEvents, getEventsById } from "../controllers/eventsController.js";

const eventRouter = express.Router();
eventRouter.get("/events", getEvents);
eventRouter.get("/events/:id", getEventsById);

export default eventRouter;
