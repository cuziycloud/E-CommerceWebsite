import React, { useState } from "react";
import { FiShoppingCart, FiUser, FiTrash2, FiChevronLeft, FiSearch } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
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

  const applyDiscount = () => {
    if (discountCode === "SAVE20") {
      setIsDiscountApplied(true);
      toast.success("Discount code applied successfully");
    } else {
      toast.error("Invalid discount code");
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.10;
  const shipping = subtotal > 500 ? 0 : 29.99;
  const discount = isDiscountApplied ? subtotal * 0.20 : 0;
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button className="mr-4 text-gray-600 hover:text-gray-900">
                <FiChevronLeft size={24} />
              </button>
              <h1 className="text-xl font-bold text-gray-900">E-Shop</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
              <div className="relative">
                <FiShoppingCart size={24} className="text-gray-600" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              </div>
              <FiUser size={24} className="text-gray-600" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
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
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
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
                {isDiscountApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (20%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <input
                      type="text"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      placeholder="Enter discount code"
                      className="flex-1 mr-2 px-4 py-2 border rounded"
                    />
                    <button
                      onClick={applyDiscount}
                      className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                      Apply
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
          <h2 className="text-2xl font-bold mb-6">You may also like</h2>
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
      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <p>Email: support@eshop.com</p>
              <p>Phone: (555) 123-4567</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Policies</h3>
              <ul className="space-y-2">
                <li>Shipping Policy</li>
                <li>Return Policy</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Support</h3>
              <p>Available 24/7</p>
              <button className="mt-2 bg-white text-gray-800 px-4 py-2 rounded">
                Chat with us
              </button>
            </div>
          </div>
        </div>
      </footer>

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default CartPage;
