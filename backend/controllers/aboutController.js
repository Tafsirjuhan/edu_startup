const About = require('../models/aboutUs');

const getAboutUs = async (req, res) => {
  try {
    const doc = await About.findOne();
    if (!doc || !Array.isArray(doc.teamMembers)) {
      return res.status(404).json({ message: 'No about us data found' });
    }
    res.json(doc.teamMembers);
  } catch (err) {
    console.error('Error in getAboutUs:', err);
    res.status(500).json({ message: 'Failed to fetch About Us' });
  }
};

module.exports = { getAboutUs };
