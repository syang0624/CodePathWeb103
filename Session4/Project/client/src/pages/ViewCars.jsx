import React, { useEffect, useState } from "react";
import { getAllCars } from "../../services/CarsAPI";

const ViewCars = () => {
    const [cars, setCars] = useState([]); // Initialize state for cars

    useEffect(() => {
        const fetchCars = async () => {
            const data = await getAllCars();
            if (data) {
                setCars(data); // Set cars state with fetched data
            }
        };
        fetchCars();
    }, []);

    return (
        <div>
            <h1>Available Cars</h1>
            <ul>
                {cars.map((car) => (
                    <li key={car.id}>
                        <h2>{car.name}</h2>
                        <p>Exterior: {car.exterior}</p>
                        <p>Wheels: {car.wheels}</p>
                        <p>Roof: {car.roof}</p>
                        <p>Interior: {car.interior}</p>
                        <p>Price: ${car.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewCars;
