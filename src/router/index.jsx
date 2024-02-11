import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../page/Home";
import Login from "../page/Login";
import ProtectedRoute from "./ProtectedRoute";
import PrivateRoute from "./PrivateRoute";
import Register from "../page/Register";
import User from "../page/User";

const SetupRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Navigate to={"/dashboard"} replace={true} />
                    }></Route>
                <Route path="/" element={<ProtectedRoute />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
                <Route path="/" element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<Home />} />
                    <Route path="/user" element={<User />} />
                </Route>
                <Route path="*" element={"Not Found 404"} />
            </Routes>
        </BrowserRouter>
    );
};

export default SetupRouter;
