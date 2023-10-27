import { Navigate, Outlet } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'
import { useAuth } from "../hooks";

export const ProtectedRoute = ({ canAccess, redirect }) => {
    const { isValidatedToken } = useAuth();
    console.log(canAccess, redirect, isValidatedToken)
    return !isValidatedToken ? <Spinner animation="border" /> : canAccess ? <Outlet /> : <Navigate to={redirect} replace />
}