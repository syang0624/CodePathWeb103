import express from "express";
import {
    getLocations,
    getLocationById,
} from "../controllers/locationsController.js";

const router = express.Router();

router.get("/locations", getLocations);
router.get("/locations/:id", getLocationById);

export default router;
