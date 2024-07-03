const mongoose = require('mongoose');

const SeedToSaleSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, required: true },
  quantity: { type: Number, required: true },
  location: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SeedToSale', SeedToSaleSchema);
