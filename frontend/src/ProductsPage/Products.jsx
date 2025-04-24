// frontend/src/ProductsPage/Products.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Products() {
  const { id } = useParams(); // businessId from URL
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products/${id}`);
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err.message);
        setProducts([]);
      }
    };
  
    fetchProducts();
  }, [id]);
  

  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

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
        <h2 className="text-3xl font-poppins font-bold text-center mb-8">Products</h2>

        {currentProducts.length === 0 ? (
          <p className="text-center text-xl text-red-600">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.map((product, index) => (
              <div
                key={index}
                className="bg-[#B03052] rounded-lg shadow-lg p-10 flex flex-col items-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-50 h-50 mb-4"
                />
                <h3 className="text-xl font-poppins font-bold text-white mb-2 text-center">
                  {product.name}
                </h3>
                <p className="text-white mb-2">{product.price}</p>
                <a
                  href={product.buyNow?.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#3D0301] text-white font-poppins font-bold text-[20px] px-4 py-2 rounded-lg hover:bg-[#6B1532] transition"
                >
                  {product.buyNow?.label || 'Buy Now'}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
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
            Next Page
          </button>
        </div>
      </div>
    </section>
  );
}

export default Products;
