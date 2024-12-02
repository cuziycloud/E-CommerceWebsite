import React, { useState } from "react";
import { FiArrowLeft, FiShoppingCart, FiUser, FiSearch, FiChevronDown } from "react-icons/fi";
import { BsCreditCard2Back, BsCash, BsWallet2, BsTag } from "react-icons/bs";
import { FaTimes, FaGoogle, FaFacebook } from "react-icons/fa";
 

// Updated component to accept appliedDiscountCode prop
const CheckoutPage = ({ appliedDiscountCode = "" }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    phone: "",
    province: "",
    district: "",
    ward: "",
    street: "",
    saveAddress: false
  });
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
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });

  // Initialize discountCode state with the prop value
  const [discountCode, setDiscountCode] = useState(appliedDiscountCode);
  const [isLoggedIn] = useState(false);


  const [selectedVoucher, setSelectedVoucher] = useState("");
  const [appliedVouchers, setAppliedVouchers] = useState([]);

  const dummyProducts = [
    {
      id: 1,
      name: "Premium Headphones",
      quantity: 1,
      price: 199.99,
      image: "images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
      id: 2,
      name: "Wireless Mouse",
      quantity: 2,
      price: 49.99,
      image: "images.unsplash.com/photo-1527864550417-7fd91fc51a46"
    }
  ];

  const availableVouchers = [
    { id: 1, code: "SUMMER20", discount: 20, type: "percentage" },
    { id: 2, code: "FREESHIP", discount: 10, type: "fixed" },
    { id: 3, code: "SAVE50", discount: 50, type: "fixed" },
  ];

    const handleApplyVoucher = () => {
        const voucher = availableVouchers.find(v => v.code === selectedVoucher);
        if (voucher && !appliedVouchers.some(v => v.code === voucher.code)) {
        setAppliedVouchers([...appliedVouchers, voucher]);
        setSelectedVoucher("");
        showToast("Voucher applied successfully!");
        }
    };

    const handleRemoveVoucher = (voucherCode) => {
        setAppliedVouchers(appliedVouchers.filter(v => v.code !== voucherCode));
        showToast("Voucher removed");
    };

    const handleContinueShipping = () => {
        if (validateShippingInfo()) {
        setActiveStep(2);
        showToast("Shipping information saved successfully");
        }
    };

    const handleContinuePayment = () => {
        if (validatePaymentInfo()) {
        setActiveStep(3);
        showToast("Payment method selected successfully");
        }
    };

    const handleCompleteOrder = () => {
        showToast("Order placed successfully!");
    };

    const validateShippingInfo = () => {
        return Object.values(shippingInfo).every(value => 
        typeof value === "boolean" ? true : Boolean(value)
        );
    };

    const validatePaymentInfo = () => {
        return Boolean(paymentMethod);
    };

    const showToast = (message) => {
        alert(message);
    };

    const calculateTotal = () => {
        const subtotal = dummyProducts.reduce((acc, product) => 
        acc + (product.price * product.quantity), 0
        );
        const tax = subtotal * 0.1;
        const shipping = 10;

        let totalDiscount = 0;
        appliedVouchers.forEach(voucher => {
        if (voucher.type === "percentage") {
            totalDiscount += (subtotal * voucher.discount / 100);
        } else {
            totalDiscount += voucher.discount;
        }
        });

        const total = subtotal + tax + shipping - totalDiscount;
        return { subtotal, tax, shipping, totalDiscount, total };
    };

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

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <button
          onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
          className="flex items-center text-gray-600 mb-6"
        >
          <FiArrowLeft className="mr-2" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
          <div className="lg:col-span-2 space-y-8">
            <div className={activeStep === 1 ? "bg-white p-6 rounded-lg shadow-sm" : "bg-white p-6 rounded-lg shadow-sm opacity-50"}>
              <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={shippingInfo.fullName}
                    onChange={(e) => setShippingInfo({...shippingInfo, fullName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Province/City</label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={shippingInfo.province}
                      onChange={(e) => setShippingInfo({...shippingInfo, province: e.target.value})}
                    >
                      <option value="">Select Province</option>
                      <option value="province1">Province 1</option>
                      <option value="province2">Province 2</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">District</label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={shippingInfo.district}
                      onChange={(e) => setShippingInfo({...shippingInfo, district: e.target.value})}
                    >
                      <option value="">Select District</option>
                      <option value="district1">District 1</option>
                      <option value="district2">District 2</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Street Address</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={shippingInfo.street}
                    onChange={(e) => setShippingInfo({...shippingInfo, street: e.target.value})}
                  />
                </div>
                {isLoggedIn && (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="saveAddress"
                      checked={shippingInfo.saveAddress}
                      onChange={(e) => setShippingInfo({...shippingInfo, saveAddress: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="saveAddress" className="ml-2 text-sm text-gray-600">
                      Save this address for future purchases
                    </label>
                  </div>
                )}
                {activeStep === 1 && (
                  <button
                    onClick={handleContinueShipping}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Continue to Payment
                  </button>
                )}
              </div>
            </div>

            <div className={activeStep === 2 ? "bg-white p-6 rounded-lg shadow-sm" : "bg-white p-6 rounded-lg shadow-sm opacity-50"}>
              <h2 className="text-2xl font-bold mb-6 text-left">Payment Method</h2>
              <div className="space-y-4">
                <div className="flex items-center p-4 border rounded-lg">
                  <input
                    type="radio"
                    id="cod"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <label htmlFor="cod" className="ml-3 flex items-center">
                    <BsCash className="h-6 w-6 text-gray-400 mr-2" />
                    Cash on Delivery
                  </label>
                </div>

                <div className="flex items-center p-4 border rounded-lg">
                  <input
                    type="radio"
                    id="card"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <label htmlFor="card" className="ml-3 flex items-center">
                    <BsCreditCard2Back className="h-6 w-6 text-gray-400 mr-2" />
                    Credit/Debit Card
                  </label>
                </div>

                {paymentMethod === "card" && (
                  <div className="space-y-4 mt-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Card Number</label>
                      <input
                        type="text"
                        maxLength="16"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Cardholder Name</label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">CVV</label>
                        <input
                          type="text"
                          maxLength="3"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center p-4 border rounded-lg">
                  <input
                    type="radio"
                    id="wallet"
                    name="payment"
                    value="wallet"
                    checked={paymentMethod === "wallet"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <label htmlFor="wallet" className="ml-3 flex items-center">
                    <BsWallet2 className="h-6 w-6 text-gray-400 mr-2" />
                    E-Wallet
                  </label>
                </div>

                {activeStep === 2 && (
                  <button
                    onClick={handleContinuePayment}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Continue to Review
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 text-left">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4">
                {dummyProducts.map((product) => (
                <div key={product.id} className="flex space-x-4">
                    <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-gray-500">Qty: {product.quantity}</p>
                    <p className="text-gray-900">${product.price.toFixed(2)}</p>
                    </div>
                </div>
                ))}

                <div className="border-t pt-4">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Vouchers
                    </label>
                    <div className="flex gap-2">
                    <select
                        value={selectedVoucher}
                        onChange={(e) => setSelectedVoucher(e.target.value)}
                        className="flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option value="">Select a voucher</option>
                        {availableVouchers.map(voucher => (
                        <option key={voucher.id} value={voucher.code}>
                            {voucher.code} - {voucher.type === "percentage" ? `${voucher.discount}%` : `$${voucher.discount}`} off
                        </option>
                        ))}
                    </select>
                    <button 
                        onClick={handleApplyVoucher}
                        className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700 transition-colors"
                        disabled={!selectedVoucher}
                    >
                        Apply
                    </button>
                    </div>
                </div>

                {appliedVouchers.length > 0 && (
                    <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Applied Vouchers</h4>
                    <div className="space-y-2">
                        {appliedVouchers.map(voucher => (
                        <div key={voucher.code} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                            <div className="flex items-center">
                            <BsTag className="text-green-500 mr-2" />
                            <span className="text-sm">{voucher.code}</span>
                            </div>
                            <button
                            onClick={() => handleRemoveVoucher(voucher.code)}
                            className="text-red-500 hover:text-red-700"
                            >
                            <FaTimes />
                            </button>
                        </div>
                        ))}
                    </div>
                    </div>
                )}
                </div>

                <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${calculateTotal().subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${calculateTotal().tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>${calculateTotal().shipping.toFixed(2)}</span>
                </div>
                {calculateTotal().totalDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                    <span>Discount Savings</span>
                    <span>-${calculateTotal().totalDiscount.toFixed(2)}</span>
                    </div>
                )}
                <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${calculateTotal().total.toFixed(2)}</span>
                </div>
                </div>

                {activeStep === 3 && (
                <button
                    onClick={handleCompleteOrder}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                >
                    Complete Order
                </button>
                )}
            </div>
            </div>
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
    </div>
  );
};

export default CheckoutPage;
