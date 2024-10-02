const express = require("express");
const path = require("path");
const fs = require("fs");
const pool = require("./config/database"); // Import the database connection
const app = express();

// Serve static files like CSS, JS, and images
app.use(express.static(path.join(__dirname, "public")));

// Route for the home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Route to handle dynamic destination pages
app.get("/destination/:id", async (req, res) => {
    try {
        const destinationId = parseInt(req.params.id);

        // Query the PostgreSQL database for the destination
        const result = await pool.query(
            "SELECT * FROM destinations WHERE id = $1",
            [destinationId]
        );

        const destination = result.rows[0]; // Extract the first row from the result
        if (!destination) {
            return res
                .status(404)
                .sendFile(path.join(__dirname, "views", "404.html"));
        }

        const imagePath = path.join(__dirname, "public", destination.imageurl);

        // Check if the image exists
        fs.access(imagePath, fs.constants.F_OK, (err) => {
            if (err) {
                console.log(`Image not found: ${imagePath}`);
                return res
                    .status(404)
                    .sendFile(path.join(__dirname, "views", "404.html"));
            }

            // Send the response with the destination data and image
            res.send(`
                <h1>${destination.title}</h1>
                <p>${destination.description}</p>
                <img src="${destination.imageurl}" alt="${destination.title}" style="max-width: 600px; height: auto;">
                <a href="/">Back to list</a>
            `);
        });
    } catch (error) {
        console.error(`Error retrieving destination: ${error.message}`);
        res.status(500).send("Internal Server Error");
    }
});

// 404 page for any undefined routes
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
