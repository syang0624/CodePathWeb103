// client/src/components/LocationEvents.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEventsByLocation } from "../services/EventsAPI";
import { getLocationById } from "../services/LocationsAPI";

const LocationEvents = () => {
    const { id } = useParams();
    const [location, setLocation] = useState({});
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const locationData = await getLocationById(id);
                setLocation(locationData);

                const eventsData = await getEventsByLocation(id);
                setEvents(eventsData);
            } catch (error) {
                console.error("Error fetching location and events:", error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div>
            <h1>Events at {location.name}</h1>
            <p>{location.description}</p>
            <ul>
                {events.map((event) => (
                    <li key={event.id}>
                        <a href={`/events/${event.id}`}>{event.title}</a>
                        <p>{event.description}</p>
                        <p>{new Date(event.date).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LocationEvents;
