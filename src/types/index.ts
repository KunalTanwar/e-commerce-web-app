export type User = {
    id: string
    name: string
    email: string
}

export type AuthContextType = {
    user: User | null
    login: (email: string, password: string) => boolean
    register: (name: string, email: string, password: string) => boolean
    logout: () => void
}

export type CartItem = {
    productId: number
    quantity: number
    product: Product
}

export type CartContextType = {
    cart: CartItem[]
    addToCart: (product: Product) => void
    removeFromCart: (productId: number) => void
    isCartOpen: boolean
    openCart: () => void
    closeCart: () => void
    cartTotal: number
}

export type Product = {
    id: number
    title: string
    image: string
    price: number
    description: string
    brand: string
    model: string
    color: string
    category: string
    discount: number
}

export type ProductsResponse = {
    status: string
    message: string
    products: Product[]
}
