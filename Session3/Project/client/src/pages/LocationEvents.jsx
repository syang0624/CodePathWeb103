// LocationEvents.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To get the slug from the URL
import Event from "../components/Event";
import "../css/LocationEvents.css";
import { getEventsByLocationSlug } from "../../services/EventsAPI"; // Import the new API function

const LocationEvents = () => {
    const { slug } = useParams(); // Get the location slug from the URL
    const [location, setLocation] = useState({});
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchLocationEvents = async () => {
            try {
                const { location, events } = await getEventsByLocationSlug(
                    slug
                );
                setLocation(location);
                setEvents(events);
            } catch (error) {
                console.error("Failed to fetch location and events:", error);
            }
        };

        fetchLocationEvents();
    }, [slug]);

    return (
        <div className="location-events">
            <header>
                <div className="location-image">
                    {location.image && (
                        <img src={location.image} alt={location.name} />
                    )}
                </div>

                <div className="location-info">
                    <h2>{location.name}</h2>
                    <p>
                        {location.address}, {location.city}, {location.state}{" "}
                        {location.zip}
                    </p>
                </div>
            </header>

            <main>
                {events.length > 0 ? (
                    events.map((event) => (
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                        />
                    ))
                ) : (
                    <h2>
                        <i className="fa-regular fa-calendar-xmark fa-shake"></i>{" "}
                        {"No events scheduled at this location yet!"}
                    </h2>
                )}
            </main>
        </div>
    );
};

export default LocationEvents;
