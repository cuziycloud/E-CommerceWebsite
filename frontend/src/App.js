import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import Register from './components/Register';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import ForgotPassword from './components/ForgotPassword';
import UserProfileManagement from './components/UserProfileManagement';
import NotFound from './components/NotFound';
import AddProductForm from './components/AddProductForm';
import ProductDetail from './components/ProductDetail';
import CartPage from './components/CartPage';
import Checkout from './components/Checkout';
import './styles/tailwind.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Các route đã định nghĩa */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/user-profile" element={<UserProfileManagement />} />
          <Route path="/add-product" element={<AddProductForm/>}/>
          <Route path="/product-detail" element={<ProductDetail/>}/>
          <Route path="/cart-page" element={<CartPage/>}/>
          <Route path="/checkout" element={<Checkout/>}/>
          {/* Route dành cho các đường dẫn không tồn tại */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
