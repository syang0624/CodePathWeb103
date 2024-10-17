// server/controllers/optionsController.js
import { pool } from "../config/database.js";

// Fetch options by category with an optional isConvertible query parameter
export const getOptionsByCategory = async (req, res) => {
    const { category } = req.params;
    const { isConvertible } = req.query;

    try {
        let query = "SELECT * FROM options WHERE category = $1";
        const params = [category];

        // Apply additional filtering based on isConvertible query parameter
        if (isConvertible === "true") {
            query += " AND is_non_convertible_only = FALSE"; // Only for convertible
        } else if (isConvertible === "false") {
            query += " AND is_convertible_only = FALSE"; // Only for non-convertible
        }

        // Execute the query
        const result = await pool.query(query, params);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching options by category:", error);
        res.status(500).json({ error: "Failed to fetch options" });
    }
};

// Fetch a single option by category and ID
export const getOptionById = async (req, res) => {
    const { category, id } = req.params;
    const optionId = parseInt(id, 10); // Parse the ID to an integer
    const formattedCategory =
        category.charAt(0).toUpperCase() + category.slice(1).toLowerCase(); // Capitalize category

    try {
        const result = await pool.query(
            "SELECT * FROM options WHERE category = $1 AND id = $2",
            [formattedCategory, optionId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Option not found" });
        }

        // Return the found option
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error fetching option by ID:", error);
        res.status(500).json({ error: "Failed to fetch option" });
    }
};
