import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { CartProvider } from "./contexts/CartContext"
import Layout from "./layout"
import Home from "./pages/Home"
import { AuthRoute, ProtectedRoute } from "./routes/ProtectedRoute"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProductDetail from "./pages/ProductDetail"

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <CartProvider>
                    <Routes>
                        <Route element={<Layout />}>
                            <Route path="/" element={<Home />} />

                            <Route element={<AuthRoute />}>
                                <Route path="/login" element={<Login />} />
                                <Route
                                    path="/register"
                                    element={<Register />}
                                />
                            </Route>

                            <Route element={<ProtectedRoute />}>
                                <Route
                                    path="/product/:id"
                                    element={<ProductDetail />}
                                />
                            </Route>
                        </Route>
                    </Routes>
                </CartProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
