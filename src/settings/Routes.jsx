import React from "react";
import App from "../App";
import HotelDetails from "../components/HotelDetails"
import {
    createBrowserRouter
} from "react-router-dom";

const RoutesApp = createBrowserRouter([
    {
        path: "/hotels",
        element: <App />,
    },
    {
        path: "/hotels/:hotelId",
        element: <HotelDetails />,
    }
])

export default RoutesApp;