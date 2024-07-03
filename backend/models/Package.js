const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
  packageName: { type: String, required: true },
  weight: { type: String, required: true }, // Changed to String to match the input type "1500lbs"
  productType: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Package', PackageSchema);
