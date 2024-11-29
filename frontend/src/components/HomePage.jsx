import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaSearch, FaShoppingCart, FaUser, FaSignOutAlt, FaStar } from "react-icons/fa";

const HomePage = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // Trạng thái hộp thoại xác nhận đăng xuất
  const navigate = useNavigate();
  const location = useLocation(); // Lấy đường dẫn hiện tại

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập khi ứng dụng vừa khởi động
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token); // Cập nhật trạng thái đăng nhập
  }, []);

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập và điều hướng nếu đang ở /login
    if (isLoggedIn && location.pathname === "/login") {
      navigate("/"); // Điều hướng về trang home nếu đã đăng nhập
    }
  }, [isLoggedIn, location.pathname, navigate]);

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
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
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
        >
          Add to Cart
        </button>
      </div>
    </div>
  );

  const handleLogout = () => {
    setShowLogoutConfirm(true); // Hiển thị hộp thoại xác nhận đăng xuất
  };

  const confirmLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false); // Cập nhật lại trạng thái đăng nhập
    setShowLogoutConfirm(false); // Đóng hộp thoại xác nhận
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false); // Đóng hộp thoại xác nhận nếu người dùng hủy
  };

  const handleLogin = () => {
    navigate("/login"); // Chuyển đến trang login khi nhấn nút đăng nhập
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                className="md:hidden"
                onClick={() => setMobileMenu(!mobileMenu)}
              >
                {mobileMenu ? <FaTimes /> : <FaBars />}
              </button>
              <h1 className="text-2xl font-bold">TechStore</h1>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {categories.map(category => (
                <button key={category.id} className="text-gray-600 hover:text-blue-600">
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
                  className="w-full md:w-64 px-4 py-2 rounded-md border border-gray-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch className="absolute right-3 top-3 text-gray-400" />
              </div>
              <button className="p-2 text-gray-600">
                <FaShoppingCart size={20} />
              </button>
              <button className="p-2 text-gray-600">
                <FaUser size={20} />
              </button>

              {/* Nút Đăng Nhập/Đăng Xuất */}
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="p-2 text-red-600 hover:text-red-800"
                >
                  <FaSignOutAlt size={20} />
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="p-2 text-blue-600 hover:text-blue-800"
                >
                  Đăng Nhập
                </button>
              )}
            </div>
          </div>

          {mobileMenu && (
            <div className="md:hidden mt-4 space-y-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
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
        {/* Các phần hiển thị sản phẩm */}
        <section aria-label="Featured products">
          <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section aria-label="New Arrivals" className="mt-12">
          <h2 className="text-2xl font-bold mb-6">New Arrivals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 3).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section aria-label="Top Sellers" className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Top Sellers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      {/* Hộp thoại xác nhận đăng xuất */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-4">Are you sure you want to log out?</h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
