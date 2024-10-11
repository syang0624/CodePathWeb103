import { pool } from "./database.js";

const populate = async () => {
    try {
        // Insert locations
        await pool.query(`
      INSERT INTO locations (name, address, city, state, zip, image) VALUES
      ('Sunset Terrace', '456 Ocean Dr', 'Miami', 'FL', '33139', '/images/sunset_terrace.jpg'),
      ('Jazz Club', '789 Music Ln', 'New Orleans', 'LA', '70116', '/images/jazz_club.jpg'),
      ('Rock Arena', '2020 Stage Rd', 'Austin', 'TX', '78701', '/images/rock_arena.jpg'),
      ('Grand Theater', '303 Broadway', 'New York', 'NY', '10007', '/images/grand_theater.jpg');
    `);

        // Insert events with updated dates and times
        await pool.query(`
      INSERT INTO events (title, date, time, location_id, image) VALUES
      ('Festival X', '2024-12-10', '18:30:00', 1, '/images/festival_x.jpg'),
      ('Jazz Night', '2024-12-15', '19:30:00', 2, '/images/jazz_night.jpg'),
      ('Rock Fest', '2024-12-20', '20:00:00', 3, '/images/rock_fest.jpg'),
      ('Broadway Show', '2024-12-25', '21:30:00', 4, '/images/broadway_show.jpg'),
      ('New Year Bash', '2024-12-31', '22:00:00', 3, '/images/new_year_bash.jpg');  
    `);

        console.log("Data seeded successfully!");
    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
};

populate();
