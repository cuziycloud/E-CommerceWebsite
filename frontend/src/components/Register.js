// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { name, email, password, role };

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', userData);
      setMessage(response.data.message);
    } catch (error) {
      console.error(error.response.data);
      setMessage('Đăng ký thất bại');
    }
  };

  return (
    <div className="register">
      <h2>Đăng Ký</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Họ và tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="customer">Khách hàng</option>
          <option value="admin">Quản trị viên</option>
        </select>
        <button type="submit">Đăng ký</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
