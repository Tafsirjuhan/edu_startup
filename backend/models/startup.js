const mongoose = require('mongoose');

const startupSchema = new mongoose.Schema({
  id: Number,
  name: String,
  logo: String,
  socialLinks: {
    facebook: String,
    instagram: String,
    website: String,
    whatsapp: String,
    email: String
  }
}, { collection: 'businesses' }); // 👈 matches your collection name

module.exports = mongoose.model('Startup', startupSchema);
