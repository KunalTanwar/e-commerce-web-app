import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { useAuth } from "@/contexts/AuthContext"

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const { register } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (register(name, email, password)) {
            navigate("/login")
        } else {
            setError("Email already registered")
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <div className="container mx-auto px-4 py-12 flex-grow flex items-center justify-center">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Create an Account
                        </h1>
                        <p className="text-gray-600">
                            Join our community today
                        </p>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-8">
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                                <p className="text-red-700">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Full Name
                                </label>

                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Email Address
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Password
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                    placeholder="••••••••"
                                    required
                                />

                                <p className="mt-1 text-xs text-gray-500">
                                    Use 8 or more characters with a mix of
                                    letters, numbers & symbols
                                </p>
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                    required
                                />

                                <label
                                    htmlFor="terms"
                                    className="ml-2 block text-sm text-gray-900"
                                >
                                    I agree to the Terms and Conditions
                                </label>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-primary hover:bg-secondary text-white py-2 px-4 rounded-md font-medium"
                                >
                                    Create Account
                                </button>
                            </div>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="font-medium text-primary hover:text-secondary"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
