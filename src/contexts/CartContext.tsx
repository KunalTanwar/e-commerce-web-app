import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "./AuthContext"

import type { CartContextType, CartItem } from "@/types"

const CartContext = createContext<CartContextType | null>(null)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth()
    const [cart, setCart] = useState<CartItem[]>([])

    useEffect(() => {
        if (user) {
            const userCart = localStorage.getItem(`cart_${user.id}`)
            setCart(userCart ? JSON.parse(userCart) : [])
        }
    }, [user])

    useEffect(() => {
        if (user && cart.length > 0) {
            localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart))
        }
    }, [cart, user])

    const addToCart = (productId: number) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.productId === productId)

            if (existing) {
                return prev.map((item) =>
                    item.productId === productId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }

            return [...prev, { productId, quantity: 1 }]
        })
    }

    const removeFromCart = (productId: number) => {
        setCart((prev) => prev.filter((item) => item.productId !== productId))
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext) as CartContextType
