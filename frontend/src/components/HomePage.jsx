import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaSearch, FaShoppingCart, FaUser, FaSignOutAlt, FaStar } from "react-icons/fa";
import axios from 'axios'

const HomePage = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // Trạng thái hộp thoại xác nhận đăng xuất
  const [products, setProducts] = useState([]);
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
  
  useEffect(() => {
    axios.get("http://localhost:8080/api/getProducts/showProducts")
    .then(products => setProducts(products.data))
    .catch(err => console.log(err))
  }, [])

  const categories = [
    { id: 1, name: "Phones", icon: "📱" },
    { id: 2, name: "Laptops", icon: "💻" },
    { id: 3, name: "Tablets", icon: "📟" },
    { id: 4, name: "Accessories", icon: "🎧" }
  ];

  

  const ProductCard = ({ product }) => {
    const { name, description, price, stock, category, images, isAvailable } = product;
    const productImage = images && images.length > 0 ? images[0] : ''; // Lấy hình ảnh đầu tiên từ mảng
    const availabilityText = isAvailable ? "In Stock" : "Out of Stock";
  
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
        {/* Hiển thị ảnh sản phẩm */}
        <img
          src={productImage}
          alt={name}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="p-4">
          {/* Tên sản phẩm */}
          <h3 className="text-lg font-semibold mb-2">{name}</h3>
          {/* Mô tả sản phẩm */}
          <p className="text-gray-600 mb-2">{description}</p>
          {/* Giá và trạng thái có sẵn */}
          <p className="text-gray-800 mb-2">${price}</p>
          <p className={`text-sm ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>{availabilityText}</p>
          <p className="text-sm text-gray-500 mb-2">Category: {category}</p>
          <p className="text-sm text-gray-500 mb-2">Stock: {stock}</p>
  
          {/* Nút thêm vào giỏ hàng */}
          <button
            className={`mt-4 w-full ${isAvailable ? 'bg-blue-600' : 'bg-gray-400'} text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            disabled={!isAvailable} // Disable nếu sản phẩm không có sẵn
          >
            {isAvailable ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    );
  };
  

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
