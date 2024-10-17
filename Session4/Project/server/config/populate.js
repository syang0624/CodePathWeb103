import { pool } from "./database.js";

export const populateTables = async () => {
    try {
        // Insert more options for exterior, wheels, roof, and interior into the 'options' table
        await pool.query(`
            INSERT INTO options (category, name, price, image_url, is_convertible_only, is_non_convertible_only)
            VALUES 
            -- Exterior options
            ('exterior', 'Red', 1000.00, 'https://example.com/red.png', FALSE, FALSE),
            ('exterior', 'Blue', 1200.00, 'https://example.com/blue.png', FALSE, FALSE),
            ('exterior', 'Black', 1500.00, 'https://example.com/black.png', FALSE, FALSE),
            ('exterior', 'Silver', 1300.00, 'https://example.com/silver.png', FALSE, FALSE),
            ('exterior', 'White', 1100.00, 'https://example.com/white.png', FALSE, FALSE),
            ('exterior', 'Gray', 1400.00, 'https://example.com/gray.png', FALSE, FALSE),

            -- Wheels options
            ('wheels', '18 inch', 1500.00, 'https://example.com/18inch.png', FALSE, FALSE),
            ('wheels', '19 inch', 1700.00, 'https://example.com/19inch.png', FALSE, FALSE),
            ('wheels', '20 inch', 1800.00, 'https://example.com/20inch.png', FALSE, FALSE),
            ('wheels', '21 inch', 1900.00, 'https://example.com/21inch.png', FALSE, TRUE),  -- Convertible only
            ('wheels', '22 inch', 2000.00, 'https://example.com/22inch.png', TRUE, FALSE),  -- Convertible only

            -- Roof options
            ('roof', 'Glass Roof', 2000.00, 'https://example.com/glassroof.png', FALSE, FALSE),
            ('roof', 'Hard Top', 2500.00, 'https://example.com/hardtop.png', FALSE, FALSE),
            ('roof', 'Convertible', 3000.00, 'https://example.com/convertible.png', TRUE, FALSE),
            ('roof', 'Panoramic Roof', 2700.00, 'https://example.com/panoramic.png', FALSE, TRUE), -- Non-convertible only

            -- Interior options
            ('interior', 'Black', 800.00, 'https://example.com/blackinterior.png', FALSE, FALSE),
            ('interior', 'White', 900.00, 'https://example.com/whiteinterior.png', FALSE, FALSE),
            ('interior', 'Beige', 850.00, 'https://example.com/beigeinterior.png', FALSE, FALSE),
            ('interior', 'Gray', 950.00, 'https://example.com/grayinterior.png', FALSE, FALSE),
            ('interior', 'Red', 1000.00, 'https://example.com/redinterior.png', FALSE, TRUE)  -- Non-convertible only
        `);

        // Insert more custom cars using the options
        await pool.query(`
            INSERT INTO custom_cars (name, is_convertible, exterior_id, roof_id, wheels_id, interior_id, total_price)
            VALUES
            ('Tesla Model S', false, 1, 6, 8, 7, 7300.00),
            ('Ford Mustang GT', true, 2, 9, 11, 10, 9400.00),
            ('Chevrolet Camaro ZL1', true, 3, 9, 12, 10, 10000.00),
            ('BMW 5 Series', false, 4, 8, 8, 9, 8500.00),
            ('Audi A6', false, 5, 7, 7, 8, 8700.00),
            ('Mercedes-Benz E-Class', false, 6, 8, 9, 11, 9800.00),
            ('Porsche 911 Carrera', true, 3, 9, 12, 9, 10200.00),
            ('Honda Civic Type R', false, 2, 7, 7, 8, 7800.00),
            ('Lexus RX 350', false, 5, 7, 9, 10, 9200.00),
            ('Lamborghini Huracan', true, 1, 9, 12, 11, 11200.00);
        `);

        console.log(
            "Tables populated successfully with more options and custom cars!"
        );
    } catch (err) {
        console.error("Error populating tables:", err);
    } finally {
        // Close the pool after data population
        pool.end();
    }
};
populateTables();
