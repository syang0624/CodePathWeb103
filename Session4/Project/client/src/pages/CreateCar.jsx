import React, { useState } from "react";
import { createCar } from "../../services/CarsAPI.jsx";

const CreateCar = () => {
    const [car, setCar] = useState({
        name: "",
        exterior: "",
        wheels: "",
        roof: "",
        interior: "",
        price: "",
    });

    const handleChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createCar(car);
        alert("Car added successfully!");
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={car.name}
                    onChange={handleChange}
                />
            </label>
            <label>
                Exterior:
                <input
                    type="text"
                    name="exterior"
                    value={car.exterior}
                    onChange={handleChange}
                />
            </label>
            <label>
                Wheels:
                <input
                    type="text"
                    name="wheels"
                    value={car.wheels}
                    onChange={handleChange}
                />
            </label>
            <label>
                Roof:
                <input
                    type="text"
                    name="roof"
                    value={car.roof}
                    onChange={handleChange}
                />
            </label>
            <label>
                Interior:
                <input
                    type="text"
                    name="interior"
                    value={car.interior}
                    onChange={handleChange}
                />
            </label>
            <label>
                Price:
                <input
                    type="number"
                    name="price"
                    value={car.price}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Add Car</button>
        </form>
    );
};

export default CreateCar;
