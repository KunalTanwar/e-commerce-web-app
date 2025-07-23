import { useAuth } from "@/contexts/AuthContext"
import { Navigate, Outlet, useLocation } from "react-router-dom"

export const ProtectedRoute = () => {
    const { user } = useAuth()

    return user ? <Outlet /> : <Navigate to="/login" replace />
}

export const AuthRoute = () => {
    const { user } = useAuth()

    return !user ? <Outlet /> : <Navigate to="/" replace />
}
