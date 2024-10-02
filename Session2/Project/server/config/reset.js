import pool from "./database.js"; // Ensure correct import path for your pool
import "./dotenv.js"; // Load environment variables

const { destinationData } = require("../data/destinations.js");

// Function to create the destinations table
const createDestinationsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS destinations;

        CREATE TABLE IF NOT EXISTS destinations (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            imageUrl VARCHAR(255) NOT NULL
        )`;

    try {
        await pool.query(createTableQuery);
        console.log("🎉 destinations table created successfully");
    } catch (err) {
        console.error("⚠️ error creating destinations table", err);
        throw err; // Stop execution if table creation fails
    }
};

// Function to seed the destinations table with initial data
const seedDestinationsTable = async () => {
    // Create the table first
    await createDestinationsTable();

    // Iterate over each destination and insert it into the database
    for (const destination of destinationData) {
        const insertQuery = `
            INSERT INTO destinations (title, description, imageUrl)
            VALUES ($1, $2, $3)`;

        const values = [
            destination.title,
            destination.description,
            destination.imageUrl,
        ];

        try {
            // Insert each destination asynchronously
            await pool.query(insertQuery, values);
            console.log(`✅ ${destination.title} added successfully`);
        } catch (err) {
            console.error(`⚠️ error inserting ${destination.title}`, err);
        }
    }
};

// Run the seed function
seedDestinationsTable();
