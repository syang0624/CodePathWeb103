// client/src/components/LocationsList.js
import React, { useState, useEffect } from "react";
import { getAllLocations } from "../services/LocationsAPI";

const LocationsList = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const data = await getAllLocations();
                setLocations(data);
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        };

        fetchLocations();
    }, []);

    return (
        <div>
            <h1>Locations</h1>
            <ul>
                {locations.map((location) => (
                    <li key={location.id}>
                        <a href={`/locations/${location.id}`}>
                            {location.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LocationsList;
