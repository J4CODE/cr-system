const mongoose = require('mongoose');

const PlantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  growthStage: { type: String, required: true },
  strain: { type: String },
  plantedDate: { type: Date },
});

module.exports = mongoose.model('Plant', PlantSchema);
