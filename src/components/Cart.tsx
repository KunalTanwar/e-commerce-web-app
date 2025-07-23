import { useEffect } from "react"
import { Link } from "react-router-dom"

import { useAuth } from "@/contexts/AuthContext"
import { useCart } from "@/contexts/CartContext"

const Cart = () => {
    const { user } = useAuth()
    const { cart, removeFromCart, isCartOpen, closeCart, cartTotal } = useCart()

    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [isCartOpen])

    if (!isCartOpen || !user) return null

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300 ${
                    isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onClick={closeCart}
            />

            {/* Cart Sidebar */}
            <div
                className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-xl z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
                    isCartOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="p-6 h-full flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Your Cart</h2>
                        <button
                            onClick={closeCart}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            X
                        </button>
                    </div>

                    {cart.length === 0 ? (
                        <div className="flex-grow flex flex-col items-center justify-center text-gray-500">
                            <svg
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
                        <>
                            <div className="flex-grow overflow-y-auto">
                                <ul className="divide-y divide-gray-200">
                                    {cart.map((item) => (
                                        <li
                                            key={item.productId}
                                            className="flex py-6"
                                        >
                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                <img
                                                    src={item.product.image}
                                                    alt={item.product.title}
                                                    className="h-full w-full object-contain object-center"
                                                />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                        <h3>
                                                            {item.product.title}
                                                        </h3>
                                                        <p className="ml-4">
                                                            $
                                                            {(
                                                                item.product
                                                                    .price *
                                                                item.quantity
                                                            ).toFixed(2)}
                                                        </p>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        {item.product.category}
                                                    </p>
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                    <p className="text-gray-500">
                                                        Qty {item.quantity}
                                                    </p>
                                                    <button
                                                        type="button"
                                                        className="font-medium text-red-600 hover:text-red-500"
                                                        onClick={() =>
                                                            removeFromCart(
                                                                item.productId
                                                            )
                                                        }
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Subtotal</p>
                                    <p>${cartTotal.toFixed(2)}</p>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">
                                    Shipping and taxes calculated at checkout.
                                </p>
                                <div className="mt-6">
                                    <Link
                                        to="/checkout"
                                        onClick={closeCart}
                                        className="flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-secondary"
                                    >
                                        Checkout
                                    </Link>
                                </div>
                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                    <p>
                                        or{" "}
                                        <button
                                            type="button"
                                            className="font-medium text-primary hover:text-secondary"
                                            onClick={closeCart}
                                        >
                                            Continue Shopping
                                            <span aria-hidden="true">
                                                {" "}
                                                &rarr;
                                            </span>
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Cart
