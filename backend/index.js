require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const categoryRoutes = require('./routes/categoryRoutes');
const subCategoryRoutes = require('./routes/subCategoryRoutes');
const vehicleCategories = require('./routes/vehicleCategory')
const priceCategoryRoutes = require('./routes/priceCategoryRoutes');
const rideCostRoutes = require('./routes/rideCostRoutes');
const connectToDb = require('./database/db');

const app = express();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:8080"
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectToDb()

// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subCategoryRoutes);
app.use('/api/vehiclecategories',vehicleCategories)
app.use('/api/price-categories', priceCategoryRoutes);
app.use('/api/ride-costs', rideCostRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;