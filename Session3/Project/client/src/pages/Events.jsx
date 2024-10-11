import React, { useState, useEffect } from "react";
import { getAllEvents } from "../../services/EventsAPI";
import Event from "../components/Event";
import "../css/Event.css";

const Events = () => {
    const [events, setEvents] = useState([]);
    const [location, setLocation] = useState(""); // Store the selected location
    const [locations, setLocations] = useState([]); // Store all unique locations

    useEffect(() => {
        (async () => {
            try {
                const eventsData = await getAllEvents();
                setEvents(eventsData);

                // Extract unique locations from the event data
                const uniqueLocations = [
                    ...new Set(eventsData.map((event) => event.location)),
                ];
                setLocations(uniqueLocations); // Store unique locations for the dropdown
            } catch (error) {
                console.error("Failed to fetch events:", error);
            }
        })();
    }, []);

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const handleShowAllEvents = () => {
        setLocation(""); // Reset the filter to show all events
    };

    // Filter events based on the selected location
    const filteredEvents = events.filter(
        (event) => location === "" || event.location === location
    );

    return (
        <div className="events-page">
            <div className="event-controls">
                <select
                    className="event-location-dropdown"
                    onChange={handleLocationChange}
                    value={location}
                >
                    <option value="">See events at . . .</option>
                    {locations.map((loc, index) => (
                        <option key={index} value={loc}>
                            {loc}
                        </option>
                    ))}
                </select>

                <button
                    className="show-all-events-btn"
                    onClick={handleShowAllEvents}
                >
                    Show All Events
                </button>
            </div>

            <main className="events-grid">
                {filteredEvents && filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => (
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                            location={event.location} // Pass the location to the Event component if needed
                        />
                    ))
                ) : (
                    <h2 className="no-events-message">
                        <i className="fa-regular fa-calendar-xmark fa-shake"></i>
                        {"No events available at the moment!"}
                    </h2>
                )}
            </main>
        </div>
    );
};

export default Events;
