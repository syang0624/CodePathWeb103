import { pool } from "./database.js";

const populate = async () => {
    try {
        // Insert locations
        await pool.query(`
      INSERT INTO locations (name, address, city, state, zip, image) VALUES
      ('Echo Lounge', '123 Main St', 'Dallas', 'TX', '75201', '/images/echo_lounge.jpg'),
      ('House of Blues', '2200 N Lamar St', 'Dallas', 'TX', '75202', '/images/house_of_blues.jpg'),
      ('Pavilion', '1001 Performance Pl', 'Dallas', 'TX', '75210', '/images/pavilion.jpg'),
      ('American Airlines Center', '2500 Victory Ave', 'Dallas', 'TX', '75219', '/images/americanairlines.jpg');
    `);

        // Insert events with properly formatted dates and times
        await pool.query(`
      INSERT INTO events (title, date, time, location_id, image) VALUES
      ('Concert A', '2024-11-15', '19:00:00', 1, '/images/concert_a.jpg'),
      ('Concert B', '2024-11-20', '20:00:00', 2, '/images/concert_b.jpg'),
      ('Concert C', '2024-11-25', '18:00:00', 3, '/images/concert_c.jpg'),
      ('Concert D', '2024-11-30', '21:00:00', 4, '/images/concert_d.jpg'),
      ('Concert E', '2024-12-01', '18:00:00', 2, '/images/concert_e.jpg');  
    `);

        console.log("Data seeded successfully!");
    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
};

populate();
