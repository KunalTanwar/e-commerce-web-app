import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import type { Product } from "@/types"
import { useCart } from "@/contexts/CartContext"
import { fetchProductById } from "@/api"
import Navbar from "@/components/Navbar"

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [selectedImage, setSelectedImage] = useState("")
    const { addToCart } = useCart()

    useEffect(() => {
        if (!id) return

        const getProduct = async () => {
            try {
                const productId = parseInt(id)
                const data = await fetchProductById(productId)
                setProduct(data)
                setSelectedImage(data.image)
            } catch (err) {
                setError("Failed to load product details")
            } finally {
                setLoading(false)
            }
        }

        getProduct()
    }, [id])

    if (loading)
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />

                <div className="flex-grow flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            </div>
        )

    if (error)
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-md">
                        <p className="text-red-700">{error}</p>
                    </div>
                </div>
            </div>
        )

    if (!product)
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />

                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
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
                            Product not found
                        </h3>
                    </div>
                </div>
            </div>
        )

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-1/2">
                            <div className="aspect-w-1 aspect-h-1 bg-gray-50 rounded-lg overflow-hidden mb-4">
                                <img
                                    src={selectedImage}
                                    alt={product.title}
                                    className="w-full h-96 object-contain"
                                />
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() =>
                                        setSelectedImage(product.image)
                                    }
                                    className={`border rounded-md p-1 ${
                                        selectedImage === product.image
                                            ? "border-primary"
                                            : "border-gray-300"
                                    }`}
                                >
                                    <img
                                        src={product.image}
                                        alt="Thumbnail"
                                        className="h-16 w-16 object-contain"
                                    />
                                </button>
                            </div>
                        </div>

                        <div className="lg:w-1/2">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                {product.title}
                            </h1>

                            <div className="flex items-center mb-4">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-yellow-400"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                    <span className="ml-2 text-gray-600">
                                        5.0 (24 reviews)
                                    </span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className="flex items-center mb-2">
                                    <span className="text-3xl font-bold text-gray-900">
                                        ${product.price}
                                    </span>
                                    {product.discount > 0 && (
                                        <span className="ml-3 bg-red-100 text-red-800 text-sm font-semibold px-2 py-1 rounded">
                                            Save {product.discount}%
                                        </span>
                                    )}
                                </div>

                                {product.discount > 0 && (
                                    <p className="text-gray-500">
                                        <span className="line-through">
                                            $
                                            {(
                                                product.price *
                                                (1 + product.discount / 100)
                                            ).toFixed(2)}
                                        </span>
                                    </p>
                                )}
                            </div>

                            <div className="mb-8">
                                <p className="text-gray-700 mb-6">
                                    {product.description}
                                </p>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900 mb-1">
                                            Brand
                                        </h3>
                                        <p className="text-gray-600">
                                            {product.brand}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900 mb-1">
                                            Model
                                        </h3>
                                        <p className="text-gray-600">
                                            {product.model}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900 mb-1">
                                            Color
                                        </h3>
                                        <p className="text-gray-600">
                                            {product.color}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900 mb-1">
                                            Category
                                        </h3>
                                        <p className="text-gray-600 capitalize">
                                            {product.category}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button
                                className="w-full bg-primary hover:bg-secondary text-white py-3 px-6 rounded-md text-lg font-medium"
                                onClick={() => addToCart(product.id)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-gray-800 text-white py-6">
                <div className="container mx-auto px-4 text-center">
                    <p>© 2023 ShopEasy. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}

export default ProductDetail
