const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();

// Serve static files like CSS, JS, and images
app.use(express.static(path.join(__dirname, "public")));

// Route for the home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Route to handle dynamic destination pages

app.get("/destination/:id", (req, res) => {
    console.log(`Route hit for destination: ${req.params.id}`);

    const destination = destinations.find(
        (d) => d.id === parseInt(req.params.id)
    );
    console.log(destination); // Log the destination to check

    if (!destination) {
        return res
            .status(404)
            .sendFile(path.join(__dirname, "views", "404.html"));
    }

    // Construct the absolute image path
    const imagePath = path.join(__dirname, "public", destination.imageUrl);

    // Check if the image exists
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.log(`Image not found: ${imagePath}`); // Log for debugging
            return res
                .status(404)
                .sendFile(path.join(__dirname, "views", "404.html")); // Return 404 if image is not found
        }

        // Send response with image if it exists
        res.send(`
          <h1>${destination.title}</h1>
          <p>${destination.description}</p>
          <img src="${destination.imageUrl}" alt="${destination.title}" style="max-width: 600px; height: auto;">
          <a href="/">Back to list</a>
        `);
    });
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

const destinations = [
    {
        id: 1,
        title: "Santorini",
        description: "Beautiful island in Greece",
        imageUrl: "/images/santorini.png",
    },
    {
        id: 2,
        title: "Great Wall of China",
        description: "Ancient wall in China",
        imageUrl: "/images/great-wall.png",
    },
    {
        id: 3,
        title: "Machu Picchu",
        description: "Historic site in Peru",
        imageUrl: "/images/machu-picchu.jpg",
    },
    {
        id: 4,
        title: "Grand Canyon",
        description: "Natural wonder in USA",
        imageUrl: "/images/grand-canyon.jpg",
    },
    {
        id: 5,
        title: "Bora Bora",
        description: "Tropical island in French Polynesia",
        imageUrl: "/images/bora-bora.jpg",
    },
];
