import React, { useState, useEffect } from "react";
import { FiShoppingCart, FiUser, FiSearch, FiEdit, FiMapPin, FiChevronDown } from "react-icons/fi";
import { FaGoogle, FaFacebook, FaShoppingCart, FaTrash } from "react-icons/fa";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom"; // Thêm import Link
import axios from "axios"


const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  // const [cartItems, setCartItems] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showBestSeller, setShowBestSeller] = useState(false);
  const [showNewArrivals, setShowNewArrivals] = useState(false);
  const [laptops, setLaptops] = useState([]);

  useEffect(() => {
    console.log("Fetching laptops");
    axios.get("http://localhost:5000/api/products/category?category=Laptop") // Thay đổi URL thành URL đầy đủ với http://localhost:5000
      .then(response => {
        console.log("Laptops fetched:", response.data.products);
        setLaptops(response.data.products);
      })
      .catch(error => {
        console.error("There was an error fetching the laptops!", error);
      });
  }, []);


  const bannerSlides = [
    {
      id: 1,
      image: "images.unsplash.com/photo-1531297484001-80022131f5a1",
      title: "Latest Tech Deals"
    },
    {
      id: 2,
      image: "images.unsplash.com/photo-1498049794561-7780e7231661",
      title: "New Arrivals"
    },
    {
      id: 3,
      image: "images.unsplash.com/photo-1496181133206-80ce9b88a853",
      title: "Special Offers"
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "iPhone 13 Pro",
      price: "$999",
      image: "images.unsplash.com/photo-1632661674596-df8be070a5c5",
      category: "Phones",
      description: "Latest iPhone with Pro camera system",
      images: [
        "images.unsplash.com/photo-1632661674596-df8be070a5c5",
        "images.unsplash.com/photo-1610945265064-0e34e5519bbf",
        "images.unsplash.com/photo-1511707171634-5f897ff02aa9"
      ]
    },
    {
      id: 2,
      name: "MacBook Pro M1",
      price: "$1299",
      image: "images.unsplash.com/photo-1617499610754-53f754d5438d",
      category: "Laptops",
      description: "Powerful laptop with M1 chip",
      images: [
        "images.unsplash.com/photo-1617499610754-53f754d5438d",
        "images.unsplash.com/photo-1593642632823-8f785ba67e45",
        "images.unsplash.com/photo-1496181133206-80ce9b88a853"
      ]
    }
  ];

  const specialOffers = [
    {
      id: 1,
      name: "AirPods Pro",
      originalPrice: "$249",
      discountedPrice: "$179",
      image: "images.unsplash.com/photo-1572569511254-d8f925fe2cbb",
      discount: "28%"
    },
    {
      id: 2,
      name: "iPad Air",
      originalPrice: "$599",
      discountedPrice: "$449",
      image: "images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
      discount: "25%"
    }
  ];

  const bestSellers = [
    { id: 1, name: "iPhone 13 Pro", price: "$999", image: "images.unsplash.com/photo-1632661674596-df8be070a5c5" },
    { id: 2, name: "MacBook Pro M1", price: "$1299", image: "images.unsplash.com/photo-1617499610754-53f754d5438d" }
  ];

  const newArrivals = [
    { id: 1, name: "AirPods Pro", price: "$249", image: "images.unsplash.com/photo-1572569511254-d8f925fe2cbb" },
    { id: 2, name: "iPad Air", price: "$599", image: "images.unsplash.com/photo-1544244015-0df4b3ffc6b0" }
  ];

  const categories = [
    { id: 1, name: "Phones", image: "images.unsplash.com/photo-1511707171634-5f897ff02aa9" },
    { id: 2, name: "Laptops", image: "images.unsplash.com/photo-1496181133206-80ce9b88a853" },
    { id: 3, name: "Best Sellers", image: "images.unsplash.com/photo-1531297484001-80022131f5a1" },
    { id: 4, name: "New Arrivals", image: "images.unsplash.com/photo-1498049794561-7780e7231661" }
  ];

  const LoginModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="space-y-4">
          <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
          <input type="password" placeholder="Password" className="w-full p-2 border rounded" />
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
          <div className="flex space-x-4">
            <button className="flex-1 flex items-center justify-center space-x-2 border p-2 rounded">
              <FaGoogle /> <span>Google</span>
            </button>
            <button className="flex-1 flex items-center justify-center space-x-2 border p-2 rounded">
              <FaFacebook /> <span>Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ProductDetail = ({ product }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-4/5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-center space-x-8">
          {/* Cột Ảnh */}
          <div className="w-1/2 flex justify-center">
            <div className="grid grid-cols-2 gap-4">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={`https://${image}`}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
  
          {/* Cột Thông tin sản phẩm */}
          <div className="w-1/2 flex flex-col items-center justify-center">
            {/* Tiêu đề */}
            <h2 className="text-3xl font-bold mb-4 text-center">{product.name}</h2>
            
            {/* Giá sản phẩm */}
            <p className="text-2xl text-blue-600 mb-4 text-center">{product.price}</p>
  
            {/* Mô tả sản phẩm */}
            <p className="text-gray-600 mb-6 text-center">{product.description}</p>
  
            {/* Số lượng */}
            <div className="flex items-center justify-center space-x-4 mb-6">
              <label className="text-lg font-semibold">Quantity:</label>
              <input type="number" min="1" defaultValue="1" className="w-20 p-2 border rounded" />
            </div>
  
            {/* Nút thêm vào giỏ hàng và mua ngay */}
            <div className="space-x-4 flex justify-center">
              <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                Add to Cart
              </button>
              <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
                Buy Now
              </button>
            </div>
          </div>
        </div>
  
        {/* Nút đóng */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>
    </div>
  );
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === bannerSlides.length - 1 ? 0 : prev + 1));
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  //Shopping Cart
  const [isHovered, setIsHovered] = useState(false);

  const cartItems = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 199.99,
      quantity: 2,
      image: "images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 299.99,
      quantity: 1,
      image: "images.unsplash.com/photo-1523275335684-37898b6baf30"
    },
    {
      id: 3,
      name: "Portable Power Bank",
      price: 49.99,
      quantity: 3,
      image: "images.unsplash.com/photo-1583394838336-acd977736f90"
    }
  ];

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Clear timeout when component unmounts
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  const handleMouseEnter = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    const newTimeoutId = setTimeout(() => {
      setIsHovered(false);
    }, 300);
    setTimeoutId(newTimeoutId);
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
              {/* <div className="relative">
                <FiShoppingCart className="text-2xl" />
                {cartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItems}
                  </span>
                )}
              </div> */}
              <div className="relative">
                <div
                  className="p-2 cursor-pointer transform hover:scale-110 transition-transform duration-200"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="relative">
                    <FaShoppingCart className="text-2xl text-white hover:text-blue-400" />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {totalItems}
                    </span>
                  </div>

                  {isHovered && (
                    <div className="absolute right-0 mt-6 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 transition-all duration-300 ease-in-out">
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}

                      <div className="p-4 border-b border-gray-200">
                        <h2 className="text-lg font-bold text-gray-800">Items in Cart</h2>
                      </div>

                      <div className="max-h-96 overflow-y-auto">
                        {cartItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center p-4 hover:bg-gray-50 border-b border-gray-100"
                          >
                            <img
                              src={`https://${item.image}`}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-md"
                              onError={(e) => {
                                e.target.src = "https://images.unsplash.com/photo-1595246140520-1991cca1aaaa";
                              }}
                            />
                            <div className="ml-4 flex-grow">
                              <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
                              <div className="flex items-center mt-1">
                                <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                                <span className="mx-2 text-gray-400">|</span>
                                <span className="text-sm font-medium text-gray-800">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            </div>
                            <button className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200">
                              <FaTrash className="text-sm" />
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="p-4 border-t border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-gray-600">Subtotal:</span>
                          <span className="text-lg font-bold text-gray-800">
                            ${calculateSubtotal().toFixed(2)}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200">
                            View Cart
                          </button>
                          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200">
                            Checkout
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <button onClick={() => setShowLogin(true)} className="flex items-center space-x-2">
                <FiUser className="text-2xl" />
                <span>{isLoggedIn ? "John Doe" : "Login"}</span>
              </button>
              {/* <button
                onClick={() => setIsAdmin(!isAdmin)}
                className={`p-2 rounded ${isAdmin ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900"}`}
              >
                {isAdmin ? "Admin" : "Customer"}
              </button> */}
            </div>
          </div>
        </div>
      </nav> 

      {/* Search Bar */}
      <div className="container mx-auto px-4 pt-24 pb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full p-4 pl-12 rounded-lg border"
          />
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        </div>
      </div>

      {/* Banner Slider */}
      <div className="relative h-96">
        {bannerSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src={`https://${slide.image}`}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                <button className="bg-blue-600 px-8 py-3 rounded-lg hover:bg-blue-700">Shop Now</button>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? bannerSlides.length - 1 : prev - 1))}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full"
        >
          <BsChevronLeft />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev === bannerSlides.length - 1 ? 0 : prev + 1))}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full"
        >
          <BsChevronRight />
        </button>
      </div>
      

      {/* Special Offers */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Special Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {specialOffers.map(offer => (
            <div key={offer.id} className="bg-white rounded-lg shadow-md overflow-hidden flex">
              <img
                src={`https://${offer.image}`}
                alt={offer.name}
                className="w-1/3 object-cover"
              />
              <div className="p-6 flex flex-col justify-center">
                <div className="bg-red-100 text-red-600 px-3 py-1 rounded-full w-fit mb-4">
                  Save {offer.discount}
                </div>
                <h3 className="font-bold text-xl mb-2">{offer.name}</h3>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-400 line-through">{offer.originalPrice}</span>
                  <span className="text-2xl font-bold text-red-600">{offer.discountedPrice}</span>
                </div>
                <button className="mt-4 bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 w-fit">
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map(category => (
            <div
              key={category.id}
              className="relative rounded-lg overflow-hidden h-48 group cursor-pointer"
              onClick={() => setSelectedCategory(category)}
            >
              <img
                src={`https://${category.image}`}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition-all duration-300">
                <h3 className="text-white text-xl font-bold">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300"
              onClick={() => setSelectedProduct(product)}
            >
              <img
                src={`https://${product.image}`}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.price}</p>
                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Laptops */}
      <div className="container mx-auto px-4 py-12 bg-blue-50 rounded-lg">
          <h2 className="text-3xl font-bold mb-8 text-left">Laptops</h2> {/* Thêm lớp text-left để căn lề trái */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {laptops.map(product => (
              <Link to={`/product-detail/${product._id}`} key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 relative cursor-pointer">
                <img
                  src={`http://localhost:5000${product.images && product.images[0]}`}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>


      {/* Hiển thị sản phẩm theo danh mục */}
      <div className="container mx-auto px-4 py-24">
        {selectedCategory === "Best Sellers" && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Best Sellers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {bestSellers.map((product) => (
                <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg">
                  <img src={`https://${product.image}`} alt={product.name} className="w-full h-64 object-cover rounded-lg mb-4" />
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-600">{product.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedCategory === "New Arrivals" && (
          <div>
            <h2 className="text-3xl font-bold mb-8">New Arrivals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {newArrivals.map((product) => (
                <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg">
                  <img src={`https://${product.image}`} alt={product.name} className="w-full h-64 object-cover rounded-lg mb-4" />
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-600">{product.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}
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

      {/* Modals */}
      {showLogin && <LoginModal />}
      {selectedProduct && <ProductDetail product={selectedProduct} />}
    </div>
  );
};

export default HomePage;
