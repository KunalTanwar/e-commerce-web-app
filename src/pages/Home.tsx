import { useEffect, useState, type ChangeEvent } from "react"
import { Link } from "react-router-dom"

import type { Product } from "@/types"

import { fetchProducts } from "@/api"

import { useAuth } from "@/contexts/AuthContext"
import ProductCard from "@/components/ProductCard"

const Home = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const { user } = useAuth()

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await fetchProducts()
                setProducts(data)
            } catch (err) {
                setError("Failed to load products. Please try again later.")
            } finally {
                setLoading(false)
            }
        }

        getProducts()
    }, [])

    if (loading)
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        )

    if (error)
        return (
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-red-700">{error}</p>
            </div>
        )

    return (
        <>
            {user ? (
                <>
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-bold ">Products</h1>

                        <input
                            type="search"
                            className="px-4 py-2 rounded border border-gray-200 text-gray-900"
                            placeholder="Search for Products"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-16 w-16 mx-auto text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <h3 className="mt-4 text-lg font-medium text-gray-900">
                                    No products found
                                </h3>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div className="text-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 mx-auto text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                    </svg>

                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                        Please log in to view products
                    </h3>

                    <Link
                        to="/login"
                        className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black bg-primary hover:bg-secondary"
                    >
                        Login
                    </Link>
                </div>
            )}
        </>
    )
}

export default Home
