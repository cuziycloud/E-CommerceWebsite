import React, { useState, useEffect } from "react";
import { FiShoppingCart, FiUser, FiSearch } from "react-icons/fi";
import { FaGoogle, FaFacebook, FaShoppingCart, FaTrash } from "react-icons/fa";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [laptops, setLaptops] = useState([]);
  const [phones, setPhones] = useState([]);
  const [tablets, setTablets] = useState([]);
  const [consoles, setConsoles] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/products/category?category=Laptop")
      .then(response => {
        setLaptops(response.data.products);
      })
      .catch(error => {
        console.error("There was an error fetching the laptops!", error);
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products/category?category=Phone")
      .then(response => {
        setPhones(response.data.products);
      })
      .catch(error => {
        console.error("There was an error fetching the phones!", error);
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products/category?category=Tablet")
      .then(response => {
        setTablets(response.data.products);
      })
      .catch(error => {
        console.error("There was an error fetching the tablets!", error);
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products/category?category=Console")
      .then(response => {
        setConsoles(response.data.products);
      })
      .catch(error => {
        console.error("There was an error fetching the consoles!", error);
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products/category?category=Accessory")
      .then(response => {
        setAccessories(response.data.products);
      })
      .catch(error => {
        console.error("There was an error fetching the accessories!", error);
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

  const handleSearch = () => {
    navigate(`/search/${searchKeyword}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Bar */}
      <div className="container mx-auto px-4 pt-24 pb-4">
        <div className="flex items-center justify-center">
          <input
            type="text"
            placeholder="Search products..."
            value={searchKeyword} // Liên kết với state từ khóa
            onChange={(e) => setSearchKeyword(e.target.value)} // Cập nhật state từ khóa
            onKeyDown={handleKeyDown} // Thêm sự kiện onKeyDown
            className="w-3/4 md:w-1/2 p-4 pl-10 rounded-lg border"
          />
          <button
            className="ml-2 p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={handleSearch} // Gọi hàm xử lý tìm kiếm khi nhấp vào nút
          >
            <FiSearch className="text-xl" />
          </button>
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

      {/* Categories */}
<div className="container mx-auto px-4 py-12">
  <h2 className="text-3xl font-bold mb-8">Categories</h2>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    {categories.map(category => (
      <Link
        key={category.id}
        to={`/${category.name.toLowerCase()}`} // Điều hướng tới đúng trang
        className="relative rounded-lg overflow-hidden h-48 group"
      >
        <img
          src={`https://${category.image}`}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition-all duration-300">
          <h3 className="text-white text-xl font-bold">{category.name}</h3>
        </div>
      </Link>
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
        <h2 className="text-3xl font-bold mb-8 text-left">Laptops</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {laptops.map(product => (
            <Link to={`/laptop/${product.slug}`} key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 relative cursor-pointer">
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

      {/* Phones */}
      <div className="container mx-auto px-4 py-12 bg-green-50 rounded-lg">
        <h2 className="text-3xl font-bold mb-8 text-left">Phones</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {phones.map(product => (
            <Link to={`/phone/${product.slug}`} key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 relative cursor-pointer">
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

      {/* Tablets */}
      <div className="container mx-auto px-4 py-12 bg-yellow-50 rounded-lg">
        <h2 className="text-3xl font-bold mb-8 text-left">Tablets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tablets.map(product => (
            <Link to={`/tablet/${product.slug}`} key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 relative cursor-pointer">
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
  
        {/* Consoles */}
        <div className="container mx-auto px-4 py-12 bg-red-50 rounded-lg">
          <h2 className="text-3xl font-bold mb-8 text-left">Consoles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {consoles.map(product => (
              <Link to={`/console/${product.slug}`} key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 relative cursor-pointer">
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
  
        {/* Accessories */}
        <div className="container mx-auto px-4 py-12 bg-purple-50 rounded-lg">
          <h2 className="text-3xl font-bold mb-8 text-left">Accessories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {accessories.map(product => (
              <Link to={`/accessory/${product.slug}`} key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 relative cursor-pointer">
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
      </div>
    );
  };
  
  export default HomePage;
  