import type { Product, ProductsResponse } from "@/types"

const API_BASE_URL = "https://fakestoreapi.in/api"

export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/products`)

        if (!response.ok) throw new Error("Failed to fetch products")

        const data: ProductsResponse = await response.json()

        return data.products || []
    } catch (error) {
        console.error("Error fetching products:", error)
        throw error
    }
}

export const fetchProductById = async (id: number): Promise<Product> => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`)

        if (!response.ok) throw new Error("Failed to fetch product")

        const data = await response.json()

        // Handle different API response structures
        if (data.products && data.products.length > 0) {
            return data.products[0]
        }

        if (data.product) {
            return data.product
        }
        return data
    } catch (error) {
        console.error(`Error fetching product ${id}:`, error)
        throw error
    }
}
