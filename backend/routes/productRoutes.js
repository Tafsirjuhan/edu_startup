const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// GET /api/products/:businessId → fetch all products by businessId
router.get('/:businessId', async (req, res) => {
  try {
    const products = await Product.find({ businessId: parseInt(req.params.businessId) });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
});

module.exports = router;
