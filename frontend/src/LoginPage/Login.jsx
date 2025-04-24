import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ setIsLoggedIn, setUsername }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Make login request
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, formData);

      // ✅ Set state
      setIsLoggedIn(true);
      setUsername(res.data.username);

      // ✅ Save to localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', res.data.username);

      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <section className="w-full bg-[#F5F5DC] min-h-screen flex items-center justify-center py-16">
      <div className="bg-[#B03052] p-10 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-bold font-poppins text-white text-center mb-10">Login</h2>
        {error && <p className="text-red-300 text-center mb-3">{error}</p>}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white font-bold font-poppins text-black"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white font-bold font-poppins text-black"
          />
          <button
            type="submit"
            className="w-full bg-[#3D0301] text-white px-4 py-3 rounded-lg hover:bg-[#6B1532] transition font-bold font-poppins"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
