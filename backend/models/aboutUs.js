const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  teamMembers: [
    {
      name: String,
      role: String,
      image: String
    }
  ]
}, { collection: 'aboutUs' });

module.exports = mongoose.model('About', aboutSchema);
