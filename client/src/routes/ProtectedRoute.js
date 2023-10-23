import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ canAccess, redirect }) => {
    return canAccess ? <Outlet /> : <Navigate to={redirect} replace />
}