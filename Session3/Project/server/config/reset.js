// server/config/reset.js
import { pool } from "./database.js";

const createTables = async () => {
    try {
        // Drop existing tables if they exist
        await pool.query("DROP TABLE IF EXISTS events;");
        await pool.query("DROP TABLE IF EXISTS locations;");

        // Create locations table
        await pool.query(`
      CREATE TABLE locations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255),
        city VARCHAR(100),
        state VARCHAR(100),
        zip VARCHAR(20),
        image VARCHAR(255)
      );
    `);

        // Create events table
        await pool.query(`
      CREATE TABLE events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        time TEXT NOT NULL,
        location_id INTEGER REFERENCES locations(id),
        image VARCHAR(255)
      );
    `);

        console.log("Tables created successfully!");
    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
};

createTables();
