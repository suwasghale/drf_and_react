import { Route, Routes } from "react-router-dom"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import Register from "./pages/Register"
import ShopPage from "./pages/ShopPage"
import LoginForm from "./pages/Login"

const App = () => {
  return (
    <>
     <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/shop" element={<ShopPage />} />
        </Routes>
     <Footer />
    </>
  )
}
export default App