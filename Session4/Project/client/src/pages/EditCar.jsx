import React, { useEffect, useState } from "react";
import { getCarById, updateCar } from "../../services/CarsAPI.jsx";
import { useParams } from "react-router-dom";

const EditCar = () => {
    const { id } = useParams();
    const [car, setCar] = useState({
        name: "",
        exterior: "",
        wheels: "",
        roof: "",
        interior: "",
        price: "",
    });

    useEffect(() => {
        const fetchCar = async () => {
            const data = await getCarById(id);
            setCar(data);
        };
        fetchCar();
    }, [id]);

    const handleChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateCar(id, car);
        alert("Car updated successfully!");
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Similar input fields as in CreateCar component */}
        </form>
    );
};

export default EditCar;
