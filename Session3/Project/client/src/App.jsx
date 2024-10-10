// client/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LocationsList from "./components/LocationsList.jsx";
import LocationEvents from "./components/LocationEvents.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<LocationsList />} />
            <Route path="/locations/:id" element={<LocationEvents />} />
        </Routes>
    );
}

export default App;
