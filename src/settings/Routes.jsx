import React from "react";
import App from "../App";
import HotelDetails from "../components/HotelDetails"
import {
    createBrowserRouter
} from "react-router-dom";

const RoutesApp = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/:hotelId",
        element: <HotelDetails />,
    }
])

export default RoutesApp;