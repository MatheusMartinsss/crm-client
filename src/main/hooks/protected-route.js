import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRoute = ({ isAllowed, redirectPath = '/auth', children }) => {
    if (!isAllowed)
        return <Navigate to={redirectPath} replace />
    return children ? children : <Outlet />
}