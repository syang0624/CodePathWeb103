import { pool } from "./database.js";

const createTables = async () => {
    try {
        // Drop existing tables if they exist
        await pool.query("DROP TABLE IF EXISTS custom_cars, options;");

        // Create the options table with the updated schema
        await pool.query(`
            CREATE TABLE options (
                id SERIAL PRIMARY KEY,
                category VARCHAR(50) NOT NULL,
                name VARCHAR(100) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                image_url TEXT,
                is_convertible_only BOOLEAN DEFAULT FALSE,
                is_non_convertible_only BOOLEAN DEFAULT FALSE
            );
        `);

        // Create the custom_cars table
        await pool.query(`
            CREATE TABLE custom_cars (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                is_convertible BOOLEAN NOT NULL,
                exterior_id INTEGER REFERENCES options(id),
                roof_id INTEGER REFERENCES options(id),
                wheels_id INTEGER REFERENCES options(id),
                interior_id INTEGER REFERENCES options(id),
                total_price DECIMAL(10, 2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log("Tables dropped and created successfully!");
    } catch (err) {
        console.error("Error creating tables:", err);
    } finally {
        // Close the pool after everything is done
        pool.end();
    }
};

createTables();
