const Startup = require('../models/startup');
const Product = require('../models/product');

const searchEverything = async (req, res) => {
  const query = req.query.q?.toLowerCase();

  if (!query) {
    return res.status(400).json({ message: 'Search query is missing' });
  }

  try {
    const businesses = await Startup.find({
      name: { $regex: query, $options: 'i' }
    });

    const products = await Product.find({
      name: { $regex: query, $options: 'i' }
    });

    res.json({
      businesses,
      products
    });
  } catch (error) {
    res.status(500).json({ message: 'Search failed', error: error.message });
  }
};

module.exports = { searchEverything };
