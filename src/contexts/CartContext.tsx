import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./AuthContext"
import type { CartContextType, CartItem, Product } from "@/types"

const CartContext = createContext<CartContextType | null>(null)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth()
    const [cart, setCart] = useState<CartItem[]>([])
    const [isCartOpen, setIsCartOpen] = useState(false)

    // Load cart from localStorage
    useEffect(() => {
        if (user) {
            const savedCart = localStorage.getItem(`cart_${user.id}`)
            try {
                const parsedCart = savedCart ? JSON.parse(savedCart) : []
                // Validate cart items have product data
                const validCart = parsedCart.filter(
                    (item: any) => item.product && item.product.price
                )
                setCart(validCart)
            } catch (error) {
                console.error("Error parsing cart data:", error)
                setCart([])
            }
        } else {
            setCart([])
        }
    }, [user])

    // Save cart to localStorage
    useEffect(() => {
        if (user && cart.length > 0) {
            localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart))
        }
    }, [cart, user])

    const addToCart = (product: Product) => {
        if (!product || !product.price) {
            console.error("Invalid product data:", product)
            return
        }

        setCart((prev) => {
            const existingItem = prev.find(
                (item) => item.productId === product.id
            )
            if (existingItem) {
                return prev.map((item) =>
                    item.productId === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
            return [
                ...prev,
                {
                    productId: product.id,
                    quantity: 1,
                    product: { ...product }, // Ensure we store a copy of the product
                },
            ]
        })
        setIsCartOpen(true)
    }

    const removeFromCart = (productId: number) => {
        setCart((prev) => prev.filter((item) => item.productId !== productId))
    }

    const openCart = () => setIsCartOpen(true)
    const closeCart = () => setIsCartOpen(false)

    // Safe calculation of cart total
    const cartTotal = cart.reduce((total, item) => {
        if (!item.product || typeof item.product.price !== "number") {
            console.warn("Invalid product in cart:", item)
            return total
        }
        return total + item.product.price * item.quantity
    }, 0)

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                isCartOpen,
                openCart,
                closeCart,
                cartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
