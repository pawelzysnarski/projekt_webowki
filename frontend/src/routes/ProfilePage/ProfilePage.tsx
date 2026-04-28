import { useAuth } from "../../components/AuthContext/AuthContext";
import Login from "../../components/Login/Login";
import { Navigate } from "react-router-dom";

export default function ProfilePage() {
    const { user } = useAuth();

    if (user) {
        return <Navigate to="/" replace />;
    }

    return <Login />;
}