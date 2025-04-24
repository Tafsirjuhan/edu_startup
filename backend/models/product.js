const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: String,
  image: String,
  businessId: Number,
  buyNow: {
    label: String,
    link: String
  }
}, { collection: 'products' }); // Make sure it matches your MongoDB collection name

module.exports = mongoose.model('Product', productSchema);
