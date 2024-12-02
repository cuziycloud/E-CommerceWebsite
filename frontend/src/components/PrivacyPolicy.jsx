import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FiShoppingCart, FiUser, FiSearch, FiEdit, FiMapPin, FiChevronDown } from "react-icons/fi";
import { IoMdMail, IoMdCall, IoMdPin } from "react-icons/io";
import { FaGoogle, FaFacebook } from "react-icons/fa";

const PrivacyPolicy = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showBestSeller, setShowBestSeller] = useState(false);
  const [showNewArrivals, setShowNewArrivals] = useState(false);

  const navigationLinks = [
    { title: "Home", href: "#" },
    { title: "About Us", href: "#" },
    { title: "Contact", href: "#" },
    { title: "Products", href: "#" }
  ];

  const privacyContent = [
    {
      title: "Introduction",
      content: "At TechStore, we value and respect your privacy rights. This Privacy Policy outlines our practices regarding the collection, use, and protection of your personal information."
    },
    {
      title: "Data Collection",
      content: "We collect information that you provide directly to us, including your name, email address, phone number, and shipping address when you make a purchase or create an account."
    },
    {
      title: "Data Usage",
      content: "Your information is used to process orders, provide customer support, send important updates, and improve our services."
    },
    {
      title: "Sharing with Third Parties",
      content: "We do not sell your personal information. We only share your data with trusted partners necessary for providing our services."
    },
    {
      title: "Data Storage and Protection",
      content: "We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or misuse."
    },
    {
      title: "User Rights",
      content: "You have the right to access, modify, or delete your personal information. Contact us to exercise these rights."
    },
    {
      title: "Cookies and Tracking",
      content: "We use cookies and similar technologies to enhance your browsing experience and analyze website traffic."
    }
  ];

  const categories = [
    { id: 1, name: "Phones", image: "images.unsplash.com/photo-1511707171634-5f897ff02aa9" },
    { id: 2, name: "Laptops", image: "images.unsplash.com/photo-1496181133206-80ce9b88a853" },
    { id: 3, name: "Best Sellers", image: "images.unsplash.com/photo-1531297484001-80022131f5a1" },
    { id: 4, name: "New Arrivals", image: "images.unsplash.com/photo-1498049794561-7780e7231661" }
  ];

  const footerLinks = [
    { title: "FAQs", href: "#" },
    { title: "Return Policy", href: "#" },
    { title: "Terms of Use", href: "#" },
    { title: "Contact", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900 text-white shadow-md z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-blue-400">TechStore</h1>
              <div className="hidden md:flex space-x-6 relative">
                {categories.map(category => (
                  <div
                    key={category.id}
                    className="relative group"
                    onMouseEnter={() => setShowCategoryDropdown(true)}
                    onMouseLeave={() => setShowCategoryDropdown(false)}
                  >
                    <button className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
                      <span>{category.name}</span>
                      <FiChevronDown />
                    </button>
                    {showCategoryDropdown && (
                      <div className="absolute top-full left-0 w-48 bg-white text-gray-900 shadow-lg rounded-lg py-2 mt-2 transform opacity-0 group-hover:opacity-100 transition-all duration-200">
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Sub Category 1</a>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Sub Category 2</a>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Sub Category 3</a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="relative">
                <FiShoppingCart className="text-2xl" />
                {cartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItems}
                  </span>
                )}
              </div>
              <button onClick={() => setShowLogin(true)} className="flex items-center space-x-2">
                <FiUser className="text-2xl" />
                <span>{isLoggedIn ? "John Doe" : "Login"}</span>
              </button>
            </div>
          </div>
        </div>
      </nav> 

      <main className="container mx-auto px-4 py-8 max-w-4xl text-left mt-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4"> Privacy Policy </h1>
        <p className="text-gray-600 text-center mb-8">
          Your privacy is our top priority. We are committed to protecting your personal information.
        </p>

        <div className="space-y-8">
          {privacyContent.map((section, index) => (
            <section key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {section.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">{section.content}</p>
            </section>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">TechStore</h3>
              <p className="text-gray-400">Your one-stop shop for all things tech</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Use</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Return Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>123 Tech Street</li>
                <li>Phone: (123) 456-7890</li>
                <li>Email: support@techstore.com</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <FaFacebook className="text-2xl hover:text-blue-500 cursor-pointer" />
                <FaGoogle className="text-2xl hover:text-red-500 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;