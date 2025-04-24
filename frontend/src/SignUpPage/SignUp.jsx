import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp({ setIsLoggedIn, setUsername }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, formData);
      setIsLoggedIn(true);
      setUsername(res.data.username);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <section className="w-full bg-[#F5F5DC] min-h-screen flex items-center justify-center py-16">
      <div className="bg-[#B03052] p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-bold font-poppins text-white text-center mb-8">Create Your Account</h2>
        {error && <p className="text-red-300 text-center mb-3">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-3 font-bold font-poppins rounded-lg bg-white text-black"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 font-bold font-poppins rounded-lg bg-white text-black"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 font-bold font-poppins rounded-lg bg-white text-black"
          />
          <button
            type="submit"
            className="w-full bg-[#3D0301] mt-4 text-white px-4 py-3 rounded-lg hover:bg-[#6B1532] transition font-bold font-poppins"
          >
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
