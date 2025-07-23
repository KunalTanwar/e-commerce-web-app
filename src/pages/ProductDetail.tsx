import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

import type { Product } from "@/types"
import { fetchProductById } from "@/api"
import { useCart } from "@/contexts/CartContext"

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const { addToCart } = useCart()
    const navigate = useNavigate()

    useEffect(() => {
        if (!id) return

        const getProduct = async () => {
            try {
                const productId = parseInt(id)
                const data = await fetchProductById(productId)
                setProduct(data)
            } catch (err) {
                setError("Failed to load product details")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        getProduct()
    }, [id])

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>
    if (!product) return <div>Product not found</div>

    return (
        <div className="container mx-auto px-4 py-8">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 flex items-center text-primary hover:text-secondary"
            >
                {/* Back button icon */}
                Back to Products
            </button>

            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Product image */}
                    <div className="lg:w-1/2">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-auto max-h-96 object-contain"
                        />
                    </div>

                    {/* Product details */}
                    <div className="lg:w-1/2">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            {product.title}
                        </h1>

                        {/* Price and add to cart button */}
                        <div className="mt-6">
                            <div className="flex items-center mb-2">
                                <span className="text-3xl font-bold text-gray-900">
                                    ${product.price.toFixed(2)}
                                </span>
                                {product.discount > 0 && (
                                    <span className="ml-3 bg-red-100 text-red-800 text-sm font-semibold px-2 py-1 rounded">
                                        Save {product.discount}%
                                    </span>
                                )}
                            </div>

                            <button
                                onClick={() => addToCart(product)}
                                className="w-full bg-primary hover:bg-secondary text-white py-3 px-6 rounded-md text-lg font-medium mt-4"
                            >
                                Add to Cart
                            </button>
                        </div>

                        {/* Product description */}
                        <div className="mt-8">
                            <h2 className="text-lg font-medium text-gray-900 mb-2">
                                Description
                            </h2>
                            <p className="text-gray-700">
                                {product.description}
                            </p>
                        </div>

                        {/* Product specifications */}
                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 mb-1">
                                    Brand
                                </h3>
                                <p className="text-gray-600">{product.brand}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 mb-1">
                                    Model
                                </h3>
                                <p className="text-gray-600">{product.model}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 mb-1">
                                    Color
                                </h3>
                                <p className="text-gray-600">{product.color}</p>
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
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
