import React, { useState, useEffect } from "react"; 
import axios from 'axios';
import { BsGrid, BsClipboardData, BsBox, BsPeople, BsGraphUp, BsGear } from "react-icons/bs";
import { FiMenu, FiBell } from "react-icons/fi";
import { Line, Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement } from "chart.js";
import { Link } from 'react-router-dom'; 

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement);


const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [notifications] = useState(5);
  const [currentOrderPage, setCurrentOrderPage] = useState(1);
  const [currentProductPage, setCurrentProductPage] = useState(1);
  const [currentUserPage, setCurrentUserPage] = useState(1);
  const [users, setUsers] = useState([]); // Khai báo state cho users
  const [products, setProducts] = useState([]); // Khai báo state cho products

  const itemsPerPage = 20;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get("http://localhost:5000/api/users");
        setUsers(userResponse.data.users);
  
        const productResponse = await axios.get("http://localhost:5000/api/products");
        setProducts(productResponse.data.products);
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };
  
    fetchData();
  }, []);
  
  

  const deleteProduct = (id) => {
    axios.delete(`http://localhost:5000/api/products/${id}`)
      .then(response => {
        console.log(response.data.message);
        setProducts(products.filter(product => product._id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the product!", error);
      });
  };
  
  
  const dummyMetrics = {
    users: users.length,
    orders: 856,
    revenue: 125000,
    products: products.length // Cập nhật số lượng sản phẩm từ dữ liệu thực
  };
  


  const dummyOrders = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    customer: `Customer ${index + 1}`,
    amount: Math.floor(Math.random() * 1000),
    status: Math.random() > 0.5 ? "Delivered" : "Processing",
    date: new Date(2024, 0, index + 1).toISOString().split("T")[0]
  }));

  const dummyProducts = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    price: Math.floor(Math.random() * 1000),
    stock: Math.floor(Math.random() * 100),
    status: Math.random() > 0.2 ? "Available" : "Low Stock"
  }));

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1
      }
    ]
  };

  const pieData = {
    labels: ["Delivered", "Processing", "Cancelled"],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"]
      }
    ]
  };

  const barData = {
    labels: ["Product A", "Product B", "Product C", "Product D"],
    datasets: [
      {
        label: "Sales",
        data: [45, 32, 67, 89],
        backgroundColor: "rgba(54, 162, 235, 0.5)"
      }
    ]
  };

  const paginate = (items, currentPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const PaginationControls = ({ totalItems, currentPage, setCurrentPage }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
      <div className="flex justify-center items-center space-x-2 mt-4 mb-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Total Users</h3>
              <p className="text-3xl font-bold">{dummyMetrics.users}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
              <p className="text-3xl font-bold">{dummyMetrics.orders}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Revenue</h3>
              <p className="text-3xl font-bold">${dummyMetrics.revenue}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Products</h3>
              <p className="text-3xl font-bold">{dummyMetrics.products}</p>
            </div>
            <div className="col-span-2 bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
              <Line data={chartData} />
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Order Status</h3>
              <Pie data={pieData} />
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Product Performance</h3>
              <Bar data={barData} />
            </div>
          </div>
        );

      case "orders":
        return (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 flex justify-between items-center">
              <input
                type="text"
                placeholder="Search orders..."
                className="p-2 border rounded-lg"
              />
              <select className="p-2 border rounded-lg">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-4 text-left">Order ID</th>
                  <th className="p-4 text-left">Customer</th>
                  <th className="p-4 text-left">Amount</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {paginate(dummyOrders, currentOrderPage).map((order) => (
                  <tr key={order.id} className="border-t">
                    <td className="p-4">{order.id}</td>
                    <td className="p-4">{order.customer}</td>
                    <td className="p-4">${order.amount}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${order.status === "Delivered" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <PaginationControls
              totalItems={dummyOrders.length}
              currentPage={currentOrderPage}
              setCurrentPage={setCurrentOrderPage}
            />
          </div>
        );

        case "products":
          return (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4">
                <Link 
                  to="/admin/add-product"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add New Product
                </Link>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="p-4">STT</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Total Stock</th>
                    <th className="p-4">Variants</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginate(products, currentProductPage).map((product, index) => (
                    <tr key={product._id} className="border-t text-left">
                      <td className="p-4">{(currentProductPage - 1) * itemsPerPage + index + 1}</td>
                      <td className="p-4">{product.name}</td>
                      <td className="p-4">${product.price}</td>
                      <td className="p-4">{product.stock}</td>
                      <td className="p-4">{product.variants.length}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${product.status === "Available" ? "bg-green-100 text-green-800" : product.status === "Low Stock" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <Link 
                          to={`/admin/edit-product/${product._id}`}
                          className="text-blue-600 hover:text-blue-800 mr-2"
                        >
                          Edit
                        </Link>
                        <button 
                          className="text-red-600 hover:text-red-800"
                          onClick={() => deleteProduct(product._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <PaginationControls
                totalItems={products.length}
                currentPage={currentProductPage}
                setCurrentPage={setCurrentProductPage}
              />
            </div>
          );

          

                      case "users":
            return (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-4">
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="p-2 border rounded-lg"
                  />
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="p-4">STT</th>
                      <th className="p-4">Name</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Role</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginate(users, currentUserPage).map((user, index) => (
                      <tr key={user._id} className="border-t text-left">
                        <td className="p-4">{(currentUserPage - 1) * itemsPerPage + index + 1}</td>
                        <td className="p-4">{user.name}</td>
                        <td className="p-4">{user.email}</td>
                        <td className="p-4">{user.role}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-sm ${user.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                            {user.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="p-4">
                          <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                          <button className="text-red-600 hover:text-red-800">
                            {user.isActive ? "Ban" : "Unban"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <PaginationControls
                  totalItems={users.length}
                  currentPage={currentUserPage}
                  setCurrentPage={setCurrentUserPage}
                />
              </div>
            );

            

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-all duration-300 ${sidebarOpen ? "w-64" : "w-20"}`}
      >
        <div className="p-4 flex items-center justify-between">
          <h1 className={`font-bold text-xl ${!sidebarOpen && "hidden"}`}>Admin Panel</h1>
        </div>
        <nav className="mt-8">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center p-4 hover:bg-gray-700 ${activeTab === "dashboard" && "bg-gray-700"}`}
          >
            <BsGrid className="text-xl" />
            <span className={`ml-4 ${!sidebarOpen && "hidden"}`}>Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full flex items-center p-4 hover:bg-gray-700 ${activeTab === "orders" && "bg-gray-700"}`}
          >
            <BsClipboardData className="text-xl" />
            <span className={`ml-4 ${!sidebarOpen && "hidden"}`}>Orders</span>
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`w-full flex items-center p-4 hover:bg-gray-700 ${activeTab === "products" && "bg-gray-700"}`}
          >
            <BsBox className="text-xl" />
            <span className={`ml-4 ${!sidebarOpen && "hidden"}`}>Products</span>
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`w-full flex items-center p-4 hover:bg-gray-700 ${activeTab === "users" && "bg-gray-700"}`}
          >
            <BsPeople className="text-xl" />
            <span className={`ml-4 ${!sidebarOpen && "hidden"}`}>Users</span>
          </button>
          <button className="w-full flex items-center p-4 hover:bg-gray-700">
            <BsGraphUp className="text-xl" />
            <span className={`ml-4 ${!sidebarOpen && "hidden"}`}>Analytics</span>
          </button>
          <button className="w-full flex items-center p-4 hover:bg-gray-700">
            <BsGear className="text-xl" />
            <span className={`ml-4 ${!sidebarOpen && "hidden"}`}>Settings</span>
          </button>
        </nav>
      </div>

      <div className={`${sidebarOpen ? "ml-64" : "ml-20"} transition-all duration-300 flex flex-col flex-grow`}>
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <FiMenu className="text-xl" />
            </button>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <FiBell className="text-xl cursor-pointer" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span>Admin User</span>
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d"
                  alt="Admin"
                  className="w-8 h-8 rounded-full"
                />
              </div>
            </div>
          </div>
        </header>

        <main className="p-6 flex-grow">
          <h2 className="text-2xl font-semibold mb-6">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
          {renderContent()}
        </main>

        <footer className="bg-white shadow-sm mt-auto">
          <div className="max-w-7xl mx-auto py-4 px-4 flex justify-between items-center">
            <p className="text-sm text-gray-500">© 2024 Admin Dashboard. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Terms of Use</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Support</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminDashboard;