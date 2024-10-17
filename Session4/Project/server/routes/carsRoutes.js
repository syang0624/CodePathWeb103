import express from "express";
import {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar,
} from "../controllers/carsController.js";

const carsRouter = express.Router();

// Routes for custom cars
carsRouter.get("/cars", getAllCars);
carsRouter.get("/cars/:id", getCarById);
carsRouter.post("/cars", createCar);
carsRouter.put("/cars/:id", updateCar);
carsRouter.delete("/cars/:id", deleteCar); // Ensure this route exists

export default carsRouter;
