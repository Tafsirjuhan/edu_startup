const express = require('express');
const router = express.Router();
const { getAboutUs } = require('../controllers/aboutController');

router.get('/', getAboutUs);

module.exports = router;
