import React, { useState } from "react";
import { FiShoppingCart, FiUser, FiTrash2, FiChevronLeft, FiSearch, FiChevronDown } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
 
const CartPage = () => {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      regularPrice: 349.99,
      quantity: 2,
      image: "images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      regularPrice: 249.99,
      quantity: 1,
      image: "images.unsplash.com/photo-1523275335684-37898b6baf30"
    }
  ]);

  const [discountCode, setDiscountCode] = useState("");
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
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
  // Updated: Selected voucher state
  const [selectedVoucher, setSelectedVoucher] = useState("");

  // Updated: Available vouchers list
  const availableVouchers = [
    { code: "SAVE20", discount: 0.20, description: "20% off on all items" },
    { code: "SAVE30", discount: 0.30, description: "30% off on all items" },
    { code: "SAVE50", discount: 0.50, description: "50% off on all items" }
  ];

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    toast.success("Quantity updated successfully");
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
    toast.success("Product removed from cart");
  };

  // Updated: Apply discount function
  const applyDiscount = () => {
    if (selectedVoucher) {
      setIsDiscountApplied(true);
      toast.success("Voucher applied successfully");
    } else {
      toast.error("Please select a voucher");
    }
  };

  

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.10;
  const shipping = subtotal > 500 ? 0 : 29.99;
  // Updated: Calculate discount based on selected voucher
  const discount = isDiscountApplied && selectedVoucher ? 
    subtotal * availableVouchers.find(v => v.code === selectedVoucher)?.discount || 0 : 0;
  const total = subtotal + tax + shipping - discount;

  const suggestedProducts = [
    {
      id: 3,
      name: "Wireless Earbuds",
      price: 149.99,
      image: "images.unsplash.com/photo-1572569511254-d8f925fe2cbb"
    },
    {
      id: 4,
      name: "Smart Speaker",
      price: 199.99,
      image: "images.unsplash.com/photo-1589492477829-5e65395b66cc"
    }
  ];

  const categories = [
    { id: 1, name: "Phones", image: "images.unsplash.com/photo-1511707171634-5f897ff02aa9" },
    { id: 2, name: "Laptops", image: "images.unsplash.com/photo-1496181133206-80ce9b88a853" },
    { id: 3, name: "Best Sellers", image: "images.unsplash.com/photo-1531297484001-80022131f5a1" },
    { id: 4, name: "New Arrivals", image: "images.unsplash.com/photo-1498049794561-7780e7231661" }
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2 text-left">
            <h2 className="text-2xl font-bold mb-4">YOUR CART</h2>
            <p className="text-gray-600 mb-6">You have {cart.length} items in your cart</p>

            {cart.length === 0 ? (
              <div className="text-center py-12">
                <img
                  src="images.unsplash.com/photo-1584473457409-ae5c91d211ff"
                  alt="Empty Cart"
                  className="w-64 mx-auto mb-6"
                />
                <p className="text-xl text-gray-600 mb-4">Your cart is empty. Keep shopping!</p>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center">
                      <img
                        src={`https://${item.image}`}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FiTrash2 size={20} />
                          </button>
                        </div>
                        <div className="mt-2">
                          <span className="text-blue-600 font-bold">${item.price}</span>
                          {item.regularPrice && (
                            <span className="ml-2 text-gray-400 line-through">
                              ${item.regularPrice}
                            </span>
                          )}
                        </div>
                        <div className="mt-2 flex items-center">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 border rounded-l"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item.id, parseInt(e.target.value))
                            }
                            className="w-16 text-center border-t border-b"
                          />
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 border rounded-r"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-4">ORDER SUMMARY</h2>
                <div className="space-y-4">
                    <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                    </div>
                    {isDiscountApplied && selectedVoucher && (
                    <div className="flex justify-between text-green-600">
                        <span>Discount ({availableVouchers.find(v => v.code === selectedVoucher)?.discount * 100}%)</span>
                        <span>-${discount.toFixed(2)}</span>
                    </div>
                    )}
                    <div className="pt-4 border-t">
                    <div className="flex flex-col space-y-2">
                        <select
                        value={selectedVoucher}
                        onChange={(e) => setSelectedVoucher(e.target.value)}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                        <option value="">Select a voucher</option>
                        {availableVouchers.map((voucher) => (
                            <option key={voucher.code} value={voucher.code}>
                            {voucher.code} - {voucher.description}
                            </option>
                        ))}
                        </select>
                        <button
                        onClick={applyDiscount}
                        className="w-full bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                        >
                        Apply Voucher
                        </button>
                    </div>
                    </div>
                    <div className="pt-4 border-t">
                    <div className="flex justify-between items-center font-bold text-xl">
                        <span>Total</span>
                        <span className="text-green-600">${total.toFixed(2)}</span>
                    </div>
                    </div>
                    <div className="pt-6 space-y-3">
                    <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                        Continue Shopping
                    </button>
                    <button className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
                        Proceed to Checkout
                    </button>
                    </div>
                </div>
                </div>
            </div>
        </div>

        {/* Suggested Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-left">YOU MAY ALSO LIKE</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {suggestedProducts.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-lg shadow-sm">
                <img
                  src={`https://${product.image}`}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-blue-600 font-bold mt-2">${product.price}</p>
              </div>
            ))}
          </div>
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

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default CartPage;
