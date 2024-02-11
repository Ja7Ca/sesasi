import { Navigate } from "react-router-dom";
import Auth from "../utils/Auth";
import Sidebar from "../components/Sidebar/Sidebar";

export default function PrivateRoute() {
    if (!Auth.isAuthorization()) {
        return <Navigate to="/login" replace={true} />;
    }
    return <Sidebar />;
}
