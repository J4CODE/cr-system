const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Yay! MongoDB is now connected'))
  .catch(err => {
    console.error("Uh Oh! There's A MongoDB connection error:", err);
    process.exit(1); // Exit the process if there's a connection error
  });

// User routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Plant routes
const plantRoutes = require('./routes/plantRoutes');
app.use('/api/plants', plantRoutes);

// Package routes
const packageRoutes = require('./routes/packageRoutes');
app.use('/api/packages', packageRoutes);

// Product routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// License routes
const licenseRoutes = require('./routes/licenseRoutes');
app.use('/api/licenses', licenseRoutes);

// Seed routes
const seedToSaleRoutes = require('./routes/seedToSaleRoutes');
app.use('/api/seed-to-sale', seedToSaleRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Uh Oh! Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`The Server is running on port ${PORT}`);
});
