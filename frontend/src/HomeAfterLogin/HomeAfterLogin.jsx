import React from 'react';
import { Link } from 'react-router-dom';

function HomeAfterLogin() {
  return (
    <section className="w-full bg-[#F5F5DC] min-h-screen flex items-center justify-center py-16">
      <div className="text-center">
        <h2 className="text-3xl font-poppins font-bold text-[#000000] mb-6">Welcome Back!</h2>
        <Link to="/businesses">
          <button className="bg-[#3D0301] text-white font-poppins font-bold px-6 py-3 rounded-lg hover:bg-[#6B1532] transition">
            Browse Businesses
          </button>
        </Link>
      </div>
    </section>
  );
}

export default HomeAfterLogin;