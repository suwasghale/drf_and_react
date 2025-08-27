import React, { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import Button from "./ui/Button";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate()

  const handleSearch = ()=>{
    navigate(`/shop?search=${search}`)
  }



  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-slate-800">
              ShopEase
            </Link>
          </div>

          <div class="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            class="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
             onChange={e=> setSearch(e.target.value)}
             />
            <button onClick={handleSearch} class="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Search
            </button>
        </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-slate-700 hover:text-slate-900">
              Home
            </Link>
            <Link to="/shop" className="text-slate-700 hover:text-slate-900">
              Shop
            </Link>
            <Link to="/about" className="text-slate-700 hover:text-slate-900">
              About
            </Link>
            <Link to="/contact" className="text-slate-700 hover:text-slate-900">
              Contact
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost">Login</Button>
            <Link to='/register'>
              <Button>Register</Button>
            </Link>

            {/* Cart */}
            <button className="relative p-2 rounded-full hover:bg-slate-100 cursor-pointer">
              <ShoppingCart className="h-6 w-6 text-slate-700" />
              <span className="absolute -top-1 -right-1 bg-slate-800 text-white text-xs px-1.5 py-0.5 rounded-full">
                3
              </span>
            </button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-700 hover:text-slate-900 focus:outline-none"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pb-4 space-y-2">
          <a href="/" className="block text-slate-700 hover:text-slate-900">
            Home
          </a>
          <a href="/shop" className="block text-slate-700 hover:text-slate-900">
            Shop
          </a>
          <a
            href="/about"
            className="block text-slate-700 hover:text-slate-900"
          >
            About
          </a>
          <a
            href="/contact"
            className="block text-slate-700 hover:text-slate-900"
          >
            Contact
          </a>

          {/* Mobile Auth Buttons */}
          <div className="flex flex-col gap-2 pt-2">
            <Button variant="outline" size="md" as="a" href="/login">
              Login
            </Button>
            <Button size="md" as="a" href="/register">
              Register
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
