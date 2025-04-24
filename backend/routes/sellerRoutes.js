const express = require('express');
const router = express.Router();
const { getAllStartups } = require('../controllers/sellerController');

router.get('/', getAllStartups);

module.exports = router;
