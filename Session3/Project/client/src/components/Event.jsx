import React, { useState, useEffect } from "react";
import { getEventsById } from "../../services/EventsAPI";
import "../css/Event.css";

// Date formatting utility
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

// Time formatting utility for TEXT time values
const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
};

// Countdown function that includes days, hours, and minutes
const formatRemainingTime = (eventDate) => {
    const now = new Date();
    const event = new Date(eventDate);
    const diffMs = event - now;

    if (diffMs > 0) {
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        return `${days} days, ${hours} hours, and ${minutes} minutes remaining`;
    } else {
        return "Event has passed";
    }
};

const formatNegativeTimeRemaining = (remaining, eventId) => {
    if (remaining.includes("passed")) {
        const element = document.getElementById(`remaining-${eventId}`);
        if (element) {
            element.classList.add("negative-time-remaining");
        }
    }
};

const Event = (props) => {
    const [event, setEvent] = useState({});
    const [time, setTime] = useState("");
    const [remaining, setRemaining] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const eventData = await getEventsById(props.id);
                setEvent(eventData);
            } catch (error) {
                console.error("Error fetching event data:", error);
            }
        })();
    }, [props.id]);

    useEffect(() => {
        if (event.time) {
            const formattedTime = formatTime(event.time); // Adjust for string input
            setTime(formattedTime);
        }
    }, [event.time]);

    useEffect(() => {
        if (event.date) {
            const timeRemaining = formatRemainingTime(event.date);
            setRemaining(timeRemaining);
            formatNegativeTimeRemaining(timeRemaining, event.id);
        }
    }, [event.date, event.id]);

    return (
        <article className="event-information">
            <img src={event.image} alt={event.title} />

            <div className="event-information-overlay">
                <div className="text">
                    <h3>{event.title}</h3>
                    <p>
                        <i className="fa-regular fa-calendar fa-bounce"></i>{" "}
                        {formatDate(event.date)} <br /> {time}
                    </p>
                    <p id={`remaining-${event.id}`}>{remaining}</p>
                </div>
            </div>
        </article>
    );
};

export default Event;
