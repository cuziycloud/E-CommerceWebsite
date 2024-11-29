import React, { useState } from "react";
import { FiUser, FiLock, FiMap, FiClock, FiEye, FiEyeOff, FiHome, FiHelpCircle, FiShield } from "react-icons/fi";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const UserProfileManagement = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [showPassword, setShowPassword] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    dob: "1990-01-01",
    gender: "male"
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      recipient: "John Doe",
      address: "123 Main St",
      city: "New York",
      phone: "+1234567890",
      isDefault: true
    }
  ]);

  const [transactions] = useState([
    {
      id: "ORD001",
      date: "2024-01-15",
      amount: "$299.99",
      status: "Delivered"
    }
  ]);

  const handlePersonalInfoChange = (e) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value
    });
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Personal Information</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={personalInfo.fullName}
            onChange={handlePersonalInfoChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={personalInfo.email}
            disabled
            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            name="phone"
            value={personalInfo.phone}
            onChange={handlePersonalInfoChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200">
          Save Changes
        </button>
      </div>
    </div>
  );

  const renderPasswordChange = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Change Password</h2>
      <div className="space-y-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">Current Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-8 text-gray-500"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200">
          Update Password
        </button>
      </div>
    </div>
  );

  const renderAddresses = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Shipping Addresses</h2>
      <button className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200">
        Add New Address
      </button>
      <div className="space-y-4">
        {addresses.map((address) => (
          <div key={address.id} className="p-4 border rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{address.recipient}</h3>
                <p className="text-gray-600">{address.address}</p>
                <p className="text-gray-600">{address.city}</p>
                <p className="text-gray-600">{address.phone}</p>
              </div>
              <div className="space-x-2">
                <button className="text-blue-600 hover:text-blue-800">Edit</button>
                <button className="text-red-600 hover:text-red-800">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTransactions = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Transaction History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{transaction.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{transaction.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{transaction.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">{transaction.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600 mb-8">Manage your personal information, password, and shipping address</p>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-64 bg-white rounded-lg shadow">
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab("personal")}
                  className={`w-full flex items-center px-4 py-2 text-sm font-medium ${activeTab === "personal" ? "bg-indigo-50 text-indigo-600" : "text-gray-600 hover:bg-gray-50"}`}
                >
                  <FiUser className="mr-3 h-5 w-5" />
                  Personal Info
                </button>
                <button
                  onClick={() => setActiveTab("password")}
                  className={`w-full flex items-center px-4 py-2 text-sm font-medium ${activeTab === "password" ? "bg-indigo-50 text-indigo-600" : "text-gray-600 hover:bg-gray-50"}`}
                >
                  <FiLock className="mr-3 h-5 w-5" />
                  Change Password
                </button>
                <button
                  onClick={() => setActiveTab("addresses")}
                  className={`w-full flex items-center px-4 py-2 text-sm font-medium ${activeTab === "addresses" ? "bg-indigo-50 text-indigo-600" : "text-gray-600 hover:bg-gray-50"}`}
                >
                  <FiMap className="mr-3 h-5 w-5" />
                  Shipping Address
                </button>
                <button
                  onClick={() => setActiveTab("transactions")}
                  className={`w-full flex items-center px-4 py-2 text-sm font-medium ${activeTab === "transactions" ? "bg-indigo-50 text-indigo-600" : "text-gray-600 hover:bg-gray-50"}`}
                >
                  <FiClock className="mr-3 h-5 w-5" />
                  Transaction History
                </button>
              </nav>
            </div>

            <div className="flex-1 bg-white rounded-lg shadow p-6">
              {activeTab === "personal" && renderPersonalInfo()}
              {activeTab === "password" && renderPasswordChange()}
              {activeTab === "addresses" && renderAddresses()}
              {activeTab === "transactions" && renderTransactions()}
            </div>
          </div>
        </div>

        <footer className="mt-8 border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#" className="text-gray-600 hover:text-gray-900"><FiHome className="h-5 w-5" /></a>
              <a href="#" className="text-gray-600 hover:text-gray-900"><FiHelpCircle className="h-5 w-5" /></a>
              <a href="#" className="text-gray-600 hover:text-gray-900"><FiShield className="h-5 w-5" /></a>
            </div>
            <p className="text-gray-600 text-sm">© 2024 Company ABC. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-600 hover:text-gray-900"><FaFacebook className="h-5 w-5" /></a>
              <a href="#" className="text-gray-600 hover:text-gray-900"><FaTwitter className="h-5 w-5" /></a>
              <a href="#" className="text-gray-600 hover:text-gray-900"><FaInstagram className="h-5 w-5" /></a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default UserProfileManagement;