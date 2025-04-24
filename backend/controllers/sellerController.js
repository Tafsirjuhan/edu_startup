const Startup = require('../models/startup');

const getAllStartups = async (req, res) => {
  try {
    const startups = await Startup.find(); // Fetch from "businesses" collection
    res.json(startups); // Send directly to frontend
  } catch (err) {
    res.status(500).json({ message: 'Error fetching businesses', error: err.message });
  }
};

module.exports = { getAllStartups };
