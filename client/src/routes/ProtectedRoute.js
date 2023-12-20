import { Navigate, Outlet } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'
import { useAuthContext } from "../contexts/AuthContext";

export const ProtectedRoute = ({ canAccess, redirect }) => {
    const { isValidatedToken } = useAuthContext();

    if (!isValidatedToken) {
        return <Spinner animation="border" />;
    }
    
    return canAccess ? <Outlet /> : <Navigate to={redirect} replace />
}