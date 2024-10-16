import { pool } from "./database.js";
import { populateTables } from "./populate.js"; // Import the populateTables function

const createTables = async () => {
    try {
        // Drop existing tables if they exist
        await pool.query("DROP TABLE IF EXISTS cars;");

        // Create the cars table
        await pool.query(`
            CREATE TABLE cars (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                exterior VARCHAR(255),
                wheels VARCHAR(100),
                roof VARCHAR(100),
                interior VARCHAR(20),
                price VARCHAR(255)
            );
        `);

        console.log("Tables created successfully!");

        // Populate the tables after creating them
        await populateTables();
    } catch (err) {
        console.error("Error creating tables:", err);
    } finally {
        // Only close the pool here, after everything is done
        pool.end();
    }
};

createTables();
