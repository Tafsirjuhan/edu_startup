const Product = require('../models/product');

const getProductsByBusinessId = async (req, res) => {
  try {
    const businessId = parseInt(req.params.businessId);
    const products = await Product.find({ businessId });

    if (!products.length) {
      return res.status(404).json({ message: 'No products found' });
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getProductsByBusinessId };
