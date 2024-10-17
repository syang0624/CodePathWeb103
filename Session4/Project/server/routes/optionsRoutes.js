import express from "express";
import {
    getOptionsByCategory,
    getOptionById,
} from "../controllers/optionsController.js";

const optionsRouter = express.Router();

// Route to get an option by category and ID (placed before the category route)
optionsRouter.get("/options/:category/:id", getOptionById);

// Existing route to get options by category
optionsRouter.get("/options/:category", getOptionsByCategory);

export default optionsRouter;
