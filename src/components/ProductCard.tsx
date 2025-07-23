import { Link } from "react-router-dom"

import { useCart } from "@/contexts/CartContext"
import type { Product } from "@/types"

interface ProductCardProps {
    product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart()

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <Link to={`/product/${product.id}`} className="block">
                <div className="aspect-w-1 aspect-h-1 bg-gray-50">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-48 object-contain p-4"
                        loading="lazy"
                    />
                </div>

                <div className="p-4">
                    <div className="flex justify-between items-start">
                        <h3 className="font-medium text-gray-900 line-clamp-2 mb-1">
                            {product.title}
                        </h3>

                        {product.discount > 0 && (
                            <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">
                                -{product.discount}%
                            </span>
                        )}
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                        <div>
                            <span className="text-lg font-bold text-gray-900">
                                ${product.price.toFixed(2)}
                            </span>

                            {product.discount > 0 && (
                                <span className="ml-2 text-sm text-gray-500 line-through">
                                    $
                                    {(
                                        product.price *
                                        (1 + product.discount / 100)
                                    ).toFixed(2)}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-yellow-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>

                            <span className="text-sm ml-1">5.0</span>
                        </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1">
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {product.brand}
                        </span>

                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                            {product.category}
                        </span>
                    </div>
                </div>
            </Link>

            <button
                className="w-full mt-2 bg-primary hover:bg-secondary text-white py-2 px-4"
                onClick={(e) => {
                    e.preventDefault()
                    addToCart(product.id)
                }}
            >
                Add to Cart
            </button>
        </div>
    )
}

export default ProductCard
