import React, { useEffect, useState } from "react";
import { getCarById } from "../../services/CarsAPI.jsx";
import { useParams } from "react-router-dom";

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);

    useEffect(() => {
        const fetchCar = async () => {
            const data = await getCarById(id);
            setCar(data);
        };
        fetchCar();
    }, [id]);

    if (!car) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{car.name}</h1>
            <p>Exterior: {car.exterior}</p>
            <p>Wheels: {car.wheels}</p>
            <p>Roof: {car.roof}</p>
            <p>Interior: {car.interior}</p>
            <p>Price: ${car.price}</p>
        </div>
    );
};

export default CarDetails;
