// frontend/src/pages/Login.jsx
import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BiLock } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";  // Import axios

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();  // Sử dụng useNavigate để điều hướng

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validationErrors = {};

    // Kiểm tra email và password có nhập hay không
    if (!email) validationErrors.email = "Email is required";
    if (!password) validationErrors.password = "Password is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      // Gửi yêu cầu đăng nhập đến API của backend
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });

      // Lưu JWT token vào localStorage
      localStorage.setItem("authToken", response.data.token);

      // Điều hướng tới trang HomePage nếu đăng nhập thành công
      navigate("/home"); // Đảm bảo có route "/home" trong React Router
    } catch (error) {
      console.error("Login failed:", error);
      setErrors({ general: "Đăng nhập thất bại, vui lòng thử lại!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 p-4">
      <div className="absolute inset-0 z-0 backdrop-blur-sm bg-opacity-50" style={{ backgroundImage: `url("images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3")`, backgroundSize: "cover" }} />

      <div className="w-full max-w-md z-10">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Welcome Back!</h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <div className="relative">
                <MdEmail className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="email"
                  className={`w-full pl-10 pr-4 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:border-blue-500`}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            <div>
              <div className="relative">
                <BiLock className="absolute top-3 left-3 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  className={`w-full pl-10 pr-12 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:border-blue-500`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>

            {errors.general && <p className="mt-1 text-sm text-red-500">{errors.general}</p>}

            <div className="text-center">
              <a href="#" className="text-sm text-blue-600 hover:underline">Forgot your password?</a>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button type="button" className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                <FaGoogle className="text-red-500 mr-2" />
                Google
              </button>
              <button type="button" className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                <FaFacebook className="text-blue-600 mr-2" />
                Facebook
              </button>
            </div>

            <p className="text-center text-sm text-gray-600">
               Don't have an account?{" "}
             <Link to="/register" className="text-blue-600 hover:underline">
                Sign up
            </Link>
          </p>

          </form>
        </div>

        <footer className="mt-8 text-center">
          <div className="flex justify-center space-x-4 mb-4">
            <a href="#" className="text-gray-600 hover:text-gray-900"><FaTwitter /></a>
            <a href="#" className="text-gray-600 hover:text-gray-900"><FaLinkedin /></a>
            <a href="#" className="text-gray-600 hover:text-gray-900"><FaInstagram /></a>
          </div>
          <div className="text-sm text-gray-600 space-x-4">
            <a href="#" className="hover:text-gray-900">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-900">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-900">Contact Us</a>
          </div>
          <p className="mt-4 text-sm text-gray-600">© 2024 Your Company. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Login;