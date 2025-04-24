import axios from 'axios'; 
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

function Header({ isLoggedIn, setIsLoggedIn, username, handleLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  if (isAuthPage) return null;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const onLogout = () => {
    handleLogout();
    setIsDropdownOpen(false);
    navigate('/');
  };



const handleSearch = async (e) => {
  const query = e.target.value.toLowerCase();
  setSearchQuery(query);

  if (query.trim() === '') {
    setSearchResults([]);
    return;
  }

  try {
    const res = await axios.get(`http://localhost:5000/api/search?q=${query}`);
    const { businesses, products } = res.data;

    const results = [];

    businesses.forEach((b) => {
      results.push({
        type: 'business',
        name: b.name,
        link: `/business/${b.id}/products`,
      });
    });

    products.forEach((p) => {
      const biz = businesses.find(b => b.id === p.businessId);
      results.push({
        type: 'product',
        name: p.name,
        businessName: biz?.name || 'Unknown',
        link: `/business/${p.businessId}/products`,
      });
    });

    setSearchResults(results);
  } catch (err) {
    console.error('Search failed:', err.message);
  }
};


  const handleResultClick = (link) => {
    setSearchQuery('');
    setSearchResults([]);
    navigate(link);
  };

  return (
    <header className="w-full bg-[#F5F5DC] py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
        <Link to="/">
          <div className="flex items-center">
            <img src={logo} alt="EDU Startups Logo" className="w-12 h-12" />
            <div className="ml-2 flex flex-col">
              <h1 className="text-2xl pl-2 font-poppins font-bold text-[#000000] leading-none">EDU</h1>
              <h1 className="text-2xl pl-2 font-poppins font-bold text-[#000000] leading-none">Startups</h1>
            </div>
          </div>
        </Link>

        {isLoggedIn ? (
          <div className="flex-1 flex items-center relative">
            <div className="w-full max-w-lg mx-auto relative">
              <input
                type="text"
                placeholder="Search Products or Business"
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-12 pr-6 py-3 rounded-lg bg-white text-black text-lg font-poppins font-bold focus:outline-none focus:ring-2 focus:ring-[#3D0301]"
              />
              <svg
                className="w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchResults.length > 0 && (
                <div className="absolute top-14 left-0 w-full bg-[#F5F5DC] rounded-lg shadow-lg max-h-96 overflow-y-auto z-10">
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      onClick={() => handleResultClick(result.link)}
                      className="p-4 border-b border-gray-300 hover:bg-[#3D0301] hover:text-white cursor-pointer transition"
                    >
                      <p className="text-lg font-poppins font-bold">
                        {result.type === 'business' ? result.name : `${result.name} (Product)`}
                      </p>
                      <p className="text-sm font-poppins">
                        {result.type === 'business' ? 'Business' : 'Product'}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="relative ml-4">
              <button
                onClick={toggleDropdown}
                className="bg-[#3D0301] font-poppins font-bold text-[20px] text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-[#6B1532] transition"
              >
                <span>{username || 'User'}</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#3D0301] rounded-lg shadow-lg z-10">
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 text-white font-poppins font-bold text-[16px] hover:bg-[#6B1532] transition rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-x-4">
            <Link to="/login">
              <button className="text-[#000000] font-poppins font-bold text-[20px] hover:text-[#6B1532]">Login</button>
            </Link>
            <Link to="/signup">
              <button className="bg-[#3D0301] font-poppins font-bold text-[20px] text-white px-4 py-2 rounded-lg hover:bg-[#6B1532] transition">
                Register
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
