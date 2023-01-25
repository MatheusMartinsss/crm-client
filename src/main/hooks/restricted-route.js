import { Outlet, Navigate } from "react-router-dom";

export const RestrictedRoute = ({ user, redirectPath = '/' }) => {
    return user ? <Navigate to={redirectPath} /> : <Outlet /> 
}