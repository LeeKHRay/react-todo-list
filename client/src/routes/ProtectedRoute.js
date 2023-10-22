import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ condition, redirect }) => {
    return condition ? <Outlet /> : <Navigate to={redirect} replace />
}