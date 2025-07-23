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
}

export type CartContextType = {
    cart: CartItem[]
    addToCart: (productId: number) => void
    removeFromCart: (productId: number) => void
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

export type ButtonProps = {
    children: React.ReactNode
    onClick?: () => void
    type?: "button" | "submit" | "reset"
    disabled?: boolean
}

export type InputFieldProps = {
    label: string
    type: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    required?: boolean
}
