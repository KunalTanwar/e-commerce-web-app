import Cart from "@/components/Cart"
import Navbar from "@/components/Navbar"
import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="container mx-auto px-4 py-8 flex-grow-1">
                <Outlet />
            </main>

            <footer className="bg-gray-800 text-white py-6">
                <div className="container mx-auto px-4 text-center">
                    <p>© 2023 ShopEasy. All rights reserved.</p>
                </div>
            </footer>

            <Cart />
        </div>
    )
}

export default Layout
