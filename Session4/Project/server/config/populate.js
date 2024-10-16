import { pool } from "./database.js";

export const populateTables = async () => {
    try {
        await pool.query(`
            INSERT INTO cars (name, exterior, wheels, roof, interior, price)
            VALUES 
            ('Tesla Model 3', 'Red', '18 inch', 'Glass Roof', 'Black', '50000'),
            ('Ford Mustang', 'Blue', '19 inch', 'Hard Top', 'White', '45000'),
            ('Chevrolet Camaro', 'Black', '20 inch', 'Convertible', 'Red', '55000'),
            ('BMW 3 Series', 'Silver', '19 inch', 'Sunroof', 'Beige', '53000'),
            ('Audi A4', 'White', '18 inch', 'Sunroof', 'Black', '47000'),
            ('Mercedes-Benz C-Class', 'Black', '20 inch', 'Panoramic Roof', 'Brown', '60000'),
            ('Honda Civic', 'Blue', '17 inch', 'Hard Top', 'Gray', '30000'),
            ('Toyota Corolla', 'Red', '16 inch', 'Hard Top', 'Black', '25000'),
            ('Lexus IS 350', 'White', '19 inch', 'Sunroof', 'Black', '52000'),
            ('Chevrolet Malibu', 'Gray', '18 inch', 'Hard Top', 'Black', '35000');
        `);

        console.log("Tables populated successfully with additional cars!");
    } catch (err) {
        console.error("Error populating tables:", err);
    }
};
