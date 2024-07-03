const mongoose = require('mongoose');

const LicenseSchema = new mongoose.Schema({
  licenseName: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, required: true },
  issuedDate: { type: Date, default: Date.now },
  expirationDate: { type: Date },
});

module.exports = mongoose.model('License', LicenseSchema);
