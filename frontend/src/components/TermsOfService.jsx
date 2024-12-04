import React, { useState, useEffect } from "react";
import { FiShoppingCart, FiUser, FiSearch, FiEdit, FiMapPin, FiChevronDown } from "react-icons/fi";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { FaHome, FaPhone, FaEnvelope, FaMapMarkerAlt, FaBars, FaTimes } from "react-icons/fa";

const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState("introduction");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
  
  const sections = [
    {
      id: "introduction",
      title: "Introduction",
      content: "Welcome to TechStore! These Terms of Service govern your use of our website and services. By accessing or using our services, you agree to be bound by these terms."
    },
    {
      id: "terms-of-use",
      title: "Terms of Use",
      content: "Users must be at least 18 years old to make purchases. You are responsible for maintaining the confidentiality of your account information."
    },
    {
      id: "user-rights",
      title: "User Rights and Responsibilities",
      content: "Users have the right to access our services and make purchases. Users are responsible for providing accurate information and following our guidelines."
    },
    {
      id: "payment-delivery",
      title: "Payment and Delivery",
      content: "We accept major credit cards and secure payment methods. Standard delivery times vary by location and product availability."
    },
    {
      id: "return-policy",
      title: "Return Policy",
      content: "Products can be returned within 30 days of purchase. Items must be in original condition with all packaging and accessories."
    },
    {
      id: "techstore-responsibilities",
      title: "TechStore Responsibilities",
      content: "We are committed to providing quality products and services. We maintain high standards of customer service and data protection."
    },
    {
      id: "termination",
      title: "Service Termination",
      content: "We reserve the right to terminate or suspend services for violation of terms or inappropriate behavior."
    },
    {
      id: "changes",
      title: "Terms of Changes",
      content: "We may update these terms periodically. Users will be notified of significant changes via email or website announcements."
    },
    {
      id: "contact",
      title: "Contact Information",
      content: "For questions or concerns, please reach out to our support team."
    }
  ];

  const categories = [
    { id: 1, name: "Phones", image: "images.unsplash.com/photo-1511707171634-5f897ff02aa9" },
    { id: 2, name: "Laptops", image: "images.unsplash.com/photo-1496181133206-80ce9b88a853" },
    { id: 3, name: "Best Sellers", image: "images.unsplash.com/photo-1531297484001-80022131f5a1" },
    { id: 4, name: "New Arrivals", image: "images.unsplash.com/photo-1498049794561-7780e7231661" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(section =>
        document.getElementById(section.id)
      );

      const currentSection = sectionElements.find(element => {
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false);
    }
  };

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

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 pb-16 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="md:w-1/4 md:pr-8 mb-8 md:mb-0">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
            <nav>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${activeSection === section.id ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"}`}
                    >
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="md:w-3/4 text-left">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-gray-600 mb-8">Last updated: January 2024</p>

            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="mb-10"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{section.title}</h2>
                <div className="prose max-w-none text-gray-600">
                  <p>{section.content}</p>
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>

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

export default TermsOfService;