import { Navigate, Outlet } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'
import { useAuthContext } from "../contexts";

export const ProtectedRoute = ({ canAccess, redirect }) => {
    const { isValidatedToken } = useAuthContext();
    console.log(canAccess, redirect, isValidatedToken)
    return !isValidatedToken ? <Spinner animation="border" /> : canAccess ? <Outlet /> : <Navigate to={redirect} replace />
}