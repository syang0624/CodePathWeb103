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

optionsRouter.get("/api/options/roof/:id", async (req, res) => {
    const roofId = req.params.id;
    try {
        const result = await pool.query(
            "SELECT * FROM options WHERE id = $1 AND category = $2",
            [roofId, "roof"]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Roof option not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error fetching roof option:", err);
        res.status(500).json({ error: "Server error" });
    }
});

export default optionsRouter;
