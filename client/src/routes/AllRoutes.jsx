import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import UserDetails from "../pages/UserDetails";
import SignupPage from "../pages/SignupPage";
import PrivateRoute from "./PrivateRoute";

export default function AllRoutes(){

    return (
    <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/register" element={<SignupPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/userdetails" element={<PrivateRoute ><UserDetails /></PrivateRoute>}></Route>
    </Routes>
    )
}