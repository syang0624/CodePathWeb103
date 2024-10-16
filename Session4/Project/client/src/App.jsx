import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import ViewCars from "./pages/ViewCars";
import CarDetails from "./pages/CarDetails";
import CreateCar from "./pages/CreateCar";
import EditCar from "./pages/EditCar";

function App() {
    return (
        <Routes>
            {/* Add a route for the root path */}
            <Route path="/" element={<Navigate to="/cars" />} />
            {/* Other routes */}
            <Route path="/cars" element={<ViewCars />} />
            <Route path="/cars/:id" element={<CarDetails />} />
            <Route path="/cars/new" element={<CreateCar />} />
            <Route path="/cars/edit/:id" element={<EditCar />} />
        </Routes>
    );
}

export default App;
