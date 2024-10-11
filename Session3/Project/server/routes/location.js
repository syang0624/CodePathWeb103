import express from "express";
import {
    getLocation,
    getLocationById,
} from "../controllers/locationController.js";

const locationRouter = express.Router();
locationRouter.get("/location", getLocation);
locationRouter.get("/location/:id", getLocationById);

export default locationRouter;
