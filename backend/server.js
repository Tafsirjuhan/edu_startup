const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// DB Connection
const connectDB = require('./config/db');
connectDB(); // Connect to MongoDB

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const sellerRoutes = require('./routes/sellerRoutes');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const searchRoutes = require('./routes/searchRoutes');


app.use('/api/sellers', require('./routes/sellerRoutes'));
app.use('/api/products', productRoutes);       // Get product list by pageName
app.use('/api/auth', authRoutes);              // User signup/login
app.use('/api/about', require('./routes/aboutRoutes'));
app.use('/api/search', searchRoutes);

app.get('/', (req, res) => {
  res.send('EDU Startup Backend is Running 🚀');
});

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
