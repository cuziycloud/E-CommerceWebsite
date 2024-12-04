import React, { useState } from "react";
import { FiUser, FiLock, FiMap, FiClock, FiEye, FiChevronDown, FiEyeOff, FiShoppingCart, FiEdit2, FiTrash2, FiGift } from "react-icons/fi";
import { FaFacebook, FaGoogle } from "react-icons/fa";

const UserProfileManagement = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
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
  const [newAddress, setNewAddress] = useState({
    name: "",
    address: "",
    city: "",
    phone: ""
  });

  const [personalInfo, setPersonalInfo] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890"
  });

  const categories = [
    { id: 1, name: "Phones", image: "images.unsplash.com/photo-1511707171634-5f897ff02aa9" },
    { id: 2, name: "Laptops", image: "images.unsplash.com/photo-1496181133206-80ce9b88a853" },
    { id: 3, name: "Best Sellers", image: "images.unsplash.com/photo-1531297484001-80022131f5a1" },
    { id: 4, name: "New Arrivals", image: "images.unsplash.com/photo-1498049794561-7780e7231661" }
  ];
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "John Doe",
      address: "123 Main Street",
      city: "New York",
      phone: "+1 234 567 890"
    }
  ]);

  const [rewards] = useState([
    {
      orderId: "#ORD001",
      date: "2024-01-15",
      products: ["Laptop", "Mouse"],
      points: 150
    },
    {
      orderId: "#ORD002",
      date: "2024-01-10",
      products: ["Keyboard", "Headphones"],
      points: 75
    }
  ]);

  const [editAddress, setEditAddress] = useState({
    name: "",
    address: "",
    city: "",
    phone: ""
  });

  const [transactions] = useState([
    {
      orderId: "#ORD001",
      date: "2024-01-15",
      amount: "$299.99",
      status: "Completed"
    },
    {
      orderId: "#ORD002",
      date: "2024-01-10",
      amount: "$149.99",
      status: "Processing"
    }
  ]);

  const handleAddAddress = () => {
    const newId = addresses.length > 0 ? Math.max(...addresses.map(a => a.id)) + 1 : 1;
    setAddresses([...addresses, { ...newAddress, id: newId }]);
    setNewAddress({
      name: "",
      address: "",
      city: "",
      phone: ""
    });
    setShowAddAddressForm(false);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleEditClick = (address) => {
    setEditingAddressId(address.id);
    setEditAddress(address);
  };

  const handleEditSave = () => {
    setAddresses(addresses.map(addr => 
      addr.id === editingAddressId ? { ...editAddress, id: addr.id } : addr
    ));
    setEditingAddressId(null);
  };

  const handleEditCancel = () => {
    setEditingAddressId(null);
    setEditAddress({
      name: "",
      address: "",
      city: "",
      phone: ""
    });
  };

  const renderSectionTitle = (title) => (
    <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-4">{title}</h2>
  );

  const renderRewards = () => (
    <div className="space-y-6 text-left">
      {renderSectionTitle("Rewards & Points")}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider text-center">Order Date</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider text-center">Products</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider text-center">Quantity</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider text-center">Details</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider text-center">Points Earned</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rewards.map((reward) => (
              <tr key={reward.orderId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">{reward.date}</td>
                <td className="px-6 py-4 text-sm text-gray-700 text-center">{reward.products.join(", ")}</td>
                <td className="px-6 py-4 text-sm text-gray-700 text-center">{reward.products.length}</td>
                <td className="px-6 py-4 text-sm text-gray-700 text-center">Order {reward.orderId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600 text-center">{reward.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <div className="bg-indigo-50 p-3 lg:p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <p className="text-lg font-semibold text-indigo-800">
            Total Points: {rewards.reduce((sum, reward) => sum + reward.points, 0)}
          </p>
        </div>
      </div>
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="space-y-6 text-left">
      {renderSectionTitle("Personal Information")}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            value={personalInfo.fullName}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={personalInfo.email}
            disabled
            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            value={personalInfo.phone}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-center">
          Save Changes
        </button>
      </div>
    </div>
  );

  const renderChangePassword = () => (
    <div className="space-y-6 text-left">
      {renderSectionTitle("Change Password")}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Current Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <button
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>
        <div className="flex justify-end mb-4">
        <a href="#" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Forgot your password?</a>
      </div>
        <button className="w-full bg-indigo-600 text-white px-4 py-3 rounded-md hover:bg-indigo-700 transition-colors text-center">
          Update Password
        </button>
      </div>
    </div>
  );

  const renderAddresses = () => (
    <div className="space-y-6 text-left">
      {renderSectionTitle("Shipping Addresses")}
      <button 
        onClick={() => setShowAddAddressForm(true)}
        className="w-full md:w-auto bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Add New Address
      </button>

      {showAddAddressForm && (
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={newAddress.name}
                onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                value={newAddress.address}
                onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                value={newAddress.city}
                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                value={newAddress.phone}
                onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleAddAddress}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => setShowAddAddressForm(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-8 md:grid-cols-1">
        {addresses.map((address) => (
          <div key={address.id}>
            {editingAddressId === address.id ? (
              <div className="border rounded-lg p-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={editAddress.name}
                      onChange={(e) => setEditAddress({ ...editAddress, name: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                      type="text"
                      value={editAddress.address}
                      onChange={(e) => setEditAddress({ ...editAddress, address: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input
                      type="text"
                      value={editAddress.city}
                      onChange={(e) => setEditAddress({ ...editAddress, city: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="text"
                      value={editAddress.phone}
                      onChange={(e) => setEditAddress({ ...editAddress, phone: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleEditSave}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleEditCancel}
                      className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border rounded-lg p-4 relative">
                <h3 className="font-medium">{address.name}</h3>
                <p className="text-gray-600">{address.address}</p>
                <p className="text-gray-600">{address.city}</p>
                <p className="text-gray-600">{address.phone}</p>
                <div className="absolute top-4 right-4 space-x-2">
                  <button
                    onClick={() => handleEditClick(address)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FiEdit2 />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderTransactions = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Order ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <tr key={transaction.orderId}>
              <td className="px-6 py-4 whitespace-nowrap">{transaction.orderId}</td>
              <td className="px-6 py-4 whitespace-nowrap">{transaction.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">{transaction.amount}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${transaction.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                  {transaction.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">TechStore</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <FiShoppingCart className="h-6 w-6" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <FiUser className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header> */}

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
                    {/* <div className="hidden md:flex space-x-6 relative">
                    {categories.map(category => (
                      <div
                        key={category.id}
                        className="relative group"
                        onMouseEnter={() => setShowCategoryDropdown(true)}
                        onMouseLeave={() => setShowCategoryDropdown(false)}
                      >
                        <button
                          className="flex items-center space-x-1 hover:text-blue-400 transition-colors"
                          onClick={() => {
                            if (category.name === "Best Sellers") {
                              setShowBestSeller(true);
                              setShowNewArrivals(false);
                            } else if (category.name === "New Arrivals") {
                              setShowBestSeller(false);
                              setShowNewArrivals(true);
                            }
                          }}
                        >
                          <span>{category.name}</span>
                          <FiChevronDown />
                        </button>
                      </div>
                    ))}
                  </div> */}
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
                    <button
                      onClick={() => setIsAdmin(!isAdmin)}
                      className={`p-2 rounded ${isAdmin ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900"}`}
                    >
                      {isAdmin ? "Admin" : "Customer"}
                    </button>
                  </div>
                </div>
              </div>
            </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">MY PROFILE</h1>
          <p className="mt-2 text-gray-600">Manage your personal information, password, shipping address</p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3 bg-white rounded-xl shadow-sm p-4">
          <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-hidden">
              <button
                onClick={() => handleTabChange("personal")}
                className={`flex items-center px-4 py-3 rounded-lg transition-all ${activeTab === "personal" ? "bg-indigo-50 text-indigo-600" : "text-gray-600 hover:bg-gray-50"}`}
              >
                <FiUser className="h-5 w-5 mr-3" />
                <span className="text-sm font-medium whitespace-nowrap">Personal Info</span>
              </button>
              <button
                onClick={() => handleTabChange("password")}
                className={`flex items-center px-4 py-3 rounded-lg transition-all ${activeTab === "password" ? "bg-indigo-50 text-indigo-600" : "text-gray-600 hover:bg-gray-50"}`}
              >
                <FiLock className="h-5 w-5 mr-3" />
                <span className="text-sm font-medium whitespace-nowrap">Change Password</span>
              </button>
              <button
                onClick={() => handleTabChange("addresses")}
                className={`flex items-center px-4 py-3 rounded-lg transition-all ${activeTab === "addresses" ? "bg-indigo-50 text-indigo-600" : "text-gray-600 hover:bg-gray-50"}`}
              >
                <FiMap className="h-5 w-5 mr-3" />
                <span className="text-sm font-medium whitespace-nowrap">Shipping Addresses</span>
              </button>
              <button
                onClick={() => handleTabChange("transactions")}
                className={`flex items-center px-4 py-3 rounded-lg transition-all ${activeTab === "transactions" ? "bg-indigo-50 text-indigo-600" : "text-gray-600 hover:bg-gray-50"}`}
              >
                <FiClock className="h-5 w-5 mr-3" />
                <span className="text-sm font-medium whitespace-nowrap">Transaction History</span>
              </button>
              <button
                onClick={() => handleTabChange("rewards")}
                className={`flex items-center px-4 py-3 rounded-lg transition-all ${activeTab === "rewards" ? "bg-indigo-50 text-indigo-600" : "text-gray-600 hover:bg-gray-50"}`}
              >
                <FiGift className="h-5 w-5 mr-3" />
                <span className="text-sm font-medium whitespace-nowrap">Rewards</span>
              </button>
            </nav>
          </div>

          <div className="lg:col-span-9 bg-white rounded-xl shadow-sm p-6 ">
            {activeTab === "personal" && renderPersonalInfo()}
            {activeTab === "password" && renderChangePassword()}
            {activeTab === "addresses" && renderAddresses()}
            {activeTab === "transactions" && (
              <div>
                {renderSectionTitle("Transaction History")}
                {renderTransactions()}
              </div>
            )}
            {activeTab === "rewards" && renderRewards()}
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

export default UserProfileManagement;