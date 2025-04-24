import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Businesses() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const businessesPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/sellers`);
        setBusinesses(res.data);
      } catch (err) {
        console.error("Error fetching businesses:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchBusinesses();
  }, []);
  
  const totalPages = Math.ceil(businesses.length / businessesPerPage);
  const currentBusinesses = businesses.slice(
    (currentPage - 1) * businessesPerPage,
    currentPage * businessesPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <section className="w-full bg-[#F5F5DC] min-h-screen py-8 flex flex-col">
      <div className="max-w-7xl mx-auto px-4 flex-1">
        <h2 className="text-3xl font-poppins font-bold text-center mb-8">Businesses</h2>

        {loading ? (
          <p className="text-center text-xl font-poppins">Loading...</p>
        ) : currentBusinesses.length === 0 ? (
          <p className="text-center text-xl font-poppins">No businesses found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentBusinesses.map((business) => (
              <div
                key={business.id}
                className="bg-[#B03052] rounded-lg shadow-lg py-10 px-4 flex flex-col items-center"
              >
                <img
                  src={business.logo}
                  alt={`${business.name} Logo`}
                  className="w-24 h-24 mb-4 object-cover"
                />
                <h3 className="text-3xl font-poppins font-bold text-white mb-5 pt-5">{business.name}</h3>

                <div className="flex space-x-5 mb-5">
                  {business.socialLinks?.facebook && (
                    <a href={business.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                      <img src="https://img.icons8.com/ios-filled/24/ffffff/facebook--v1.png" />
                    </a>
                  )}
                  {business.socialLinks?.instagram && (
                    <a href={business.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                      <img src="https://img.icons8.com/ios-filled/24/ffffff/instagram-new.png" />
                    </a>
                  )}
                  {business.socialLinks?.website && (
                    <a href={business.socialLinks.website} target="_blank" rel="noopener noreferrer">
                      <img src="https://img.icons8.com/ios-filled/24/ffffff/domain.png" />
                    </a>
                  )}
                  {business.socialLinks?.whatsapp && (
                    <a href={business.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer">
                      <img src="https://img.icons8.com/ios-filled/24/ffffff/whatsapp.png" />
                    </a>
                  )}
                </div>

                <Link to={`/business/${business.id}/products`}>
                  <button className="bg-[#3D0301] text-white font-poppins font-bold text-[20px] px-4 py-2 rounded-lg hover:bg-[#6B1532] transition">
                    View Products
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#F5F5DC] py-4">
          <div className="flex justify-center space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 font-poppins font-bold rounded-lg ${
                  currentPage === index + 1
                    ? 'bg-[#3D0301] text-white'
                    : 'bg-gray-200 text-black'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 font-poppins font-bold rounded-lg flex items-center ${
                currentPage === totalPages
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-200 text-black'
              }`}
            >
              Next Page →
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Businesses;
