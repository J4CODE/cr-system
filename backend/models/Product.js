const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  inStock: { type: Boolean, default: true },
  createdDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', ProductSchema);
