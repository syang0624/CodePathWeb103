// server/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
// or, to specify allowed origins:
app.use(
    cors({
        origin: "http://localhost:5173", // Adjust to your frontend's origin
    })
);

// Import Routes
import eventsRoutes from "./routes/eventsRoutes.js";
import locationsRoutes from "./routes/locationsRoutes.js";

// Use Routes
app.use("/api/events", eventsRoutes);
app.use("/api/locations", locationsRoutes);

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
