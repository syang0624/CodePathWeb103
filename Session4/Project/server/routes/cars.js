import express from "express";
import {
    createCar,
    getAllCars,
    getCarById,
    updateCar,
    deleteCar,
} from "../controllers/carsController.js";

const router = express.Router();

// Route to get all cars
router.get("/", getAllCars); // Maps to /api/cars

// Route to get a specific car by ID
router.get("/:id", getCarById); // Maps to /api/cars/:id

// Route to create a new car
router.post("/", createCar); // Maps to POST /api/cars

// Route to update a specific car by ID
router.put("/:id", updateCar); // Maps to PUT /api/cars/:id

// Route to delete a specific car by ID
router.delete("/:id", deleteCar); // Maps to DELETE /api/cars/:id

export default router;
