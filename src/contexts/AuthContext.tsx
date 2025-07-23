import { createContext, useContext, useEffect, useState } from "react"
import { nanoid } from "nanoid"

import type { AuthContextType, User } from "@/types"

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const loggedInUser = localStorage.getItem("loggedInUser")

        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser))
        }
    }, [])

    const login = (email: string, password: string): boolean => {
        const users = JSON.parse(
            localStorage.getItem("registeredUsers") || "[]"
        )
        const foundUser = users.find(
            (u: any) => u.email === email && u.password === password
        )

        if (foundUser) {
            const { password, ...userData } = foundUser

            setUser(userData)

            localStorage.setItem("loggedInUser", JSON.stringify(userData))

            return true
        }
        return false
    }

    const register = (
        name: string,
        email: string,
        password: string
    ): boolean => {
        const users = JSON.parse(
            localStorage.getItem("registeredUsers") || "[]"
        )

        if (users.some((u: any) => u.email === email)) {
            return false
        }

        const newUser = { id: nanoid(), name, email, password }

        localStorage.setItem(
            "registeredUsers",
            JSON.stringify([...users, newUser])
        )

        return true
    }

    const logout = () => {
        setUser(null)

        localStorage.removeItem("loggedInUser")
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext) as AuthContextType
