import { useAuth } from "@/contexts/AuthContext"
import { Navigate, Outlet, useLocation } from "react-router-dom"

export const ProtectedRoute = () => {
    const { user } = useAuth()
    const location = useLocation()

    return user ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    )
}

export const AuthRoute = () => {
    const { user } = useAuth()
    const location = useLocation()

    return !user ? (
        <Outlet />
    ) : (
        <Navigate to={location.state?.from || "/"} replace />
    )
}
