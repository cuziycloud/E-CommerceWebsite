import React, { useState, useEffect } from "react";
import { FaSearch, FaShoppingCart, FaStar, FaUser, FaBars, FaTimes } from "react-icons/fa";

const HomePage = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: 1, name: "Phones", icon: "📱" },
    { id: 2, name: "Laptops", icon: "💻" },
    { id: 3, name: "Tablets", icon: "📟" },
    { id: 4, name: "Accessories", icon: "🎧" }
  ];

  const products = [
    {
      id: 1,
      name: "iPhone 13 Pro",
      category: "Phones",
      price: 999,
      rating: 4.8,
      image: "images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "MacBook Pro",
      category: "Laptops",
      price: 1299,
      rating: 4.9,
      image: "images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "iPad Air",
      category: "Tablets",
      price: 599,
      rating: 4.7,
      image: "images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      name: "AirPods Pro",
      category: "Accessories",
      price: 249,
      rating: 4.6,
      image: "images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
         role="article"
         aria-label={`${product.name} product card`}>
      <img
        src={`https://${product.image}`}
        alt={product.name}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-2">${product.price}</p>
        <div className="flex items-center">
          <FaStar className="text-yellow-400" />
          <span className="ml-1">{product.rating}</span>
        </div>
        <button
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label={`Add ${product.name} to cart`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                className="md:hidden"
                onClick={() => setMobileMenu(!mobileMenu)}
                aria-label="Toggle menu"
              >
                {mobileMenu ? <FaTimes /> : <FaBars />}
              </button>
              <h1 className="text-2xl font-bold">TechStore</h1>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {categories.map(category => (
                <button
                  key={category.id}
                  className="text-gray-600 hover:text-blue-600 focus:outline-none focus:text-blue-600"
                  aria-label={`${category.name} category`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full md:w-64 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search products"
                />
                <FaSearch className="absolute right-3 top-3 text-gray-400" />
              </div>
              <button
                className="p-2 text-gray-600 hover:text-blue-600 focus:outline-none focus:text-blue-600"
                aria-label="Shopping cart"
              >
                <FaShoppingCart size={20} />
              </button>
              <button
                className="p-2 text-gray-600 hover:text-blue-600 focus:outline-none focus:text-blue-600"
                aria-label="User account"
              >
                <FaUser size={20} />
              </button>
            </div>
          </div>

          {mobileMenu && (
            <div className="md:hidden mt-4 space-y-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                  aria-label={`${category.name} category`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12" aria-label="Featured products">
          <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="mb-12" aria-label="Best selling products">
          <h2 className="text-2xl font-bold mb-6">Best Selling</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section aria-label="New arrivals">
          <h2 className="text-2xl font-bold mb-6">New Arrivals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).reverse().map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-400">Your one-stop shop for all things tech.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><button className="text-gray-400 hover:text-white">Privacy Policy</button></li>
                <li><button className="text-gray-400 hover:text-white">Terms of Service</button></li>
                <li><button className="text-gray-400 hover:text-white">Contact Us</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-l-md focus:outline-none text-gray-900"
                  aria-label="Email for newsletter"
                />
                <button
                  className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Subscribe to newsletter"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;