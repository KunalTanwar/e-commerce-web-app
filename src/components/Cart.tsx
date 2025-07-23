import { useAuth } from "@/contexts/AuthContext"
import { useCart } from "@/contexts/CartContext"

const Cart = () => {
    const { user } = useAuth()
    const { cart, removeFromCart } = useCart()

    if (!user) return null

    return (
        <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl z-20 transform transition-transform duration-300 ease-in-out translate-x-0">
            <div className="p-6 h-full flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Your Cart</h2>

                    <button className="text-gray-500 hover:text-gray-700">
                        {/* <XMarkIcon className="h-6 w-6" /> */}
                    </button>
                </div>

                {cart.length === 0 ? (
                    <div className="flex-grow flex flex-col items-center justify-center text-gray-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-16 w-16 mb-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>

                        <p>Your cart is empty</p>
                    </div>
                ) : (
                    <div className="flex-grow overflow-y-auto">
                        <ul className="divide-y">
                            {cart.map((item, index) => (
                                <li
                                    key={index}
                                    className="py-4 flex items-center"
                                >
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium truncate">
                                            Product {item.productId}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            Qty: {item.quantity}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() =>
                                            removeFromCart(item.productId)
                                        }
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="mt-auto pt-6 border-t">
                    <div className="flex justify-between font-bold mb-4">
                        <span>Total:</span>
                        <span>$0.00</span> {/* Will implement later */}
                    </div>

                    <button className="w-full bg-primary hover:bg-secondary text-white py-2 px-4 rounded-md">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cart
