// routes/locationsRoutes.js
import express from "express";
import {
    getAllLocations,
    getLocationById,
} from "../controllers/locationsController.js";

const router = express.Router();

// Define routes
router.get("/", getAllLocations);
router.get("/:id", getLocationById);

export default router;
