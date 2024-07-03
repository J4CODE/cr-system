const express = require('express');
const Seed = require('../models/seedToSale');
const router = express.Router();

// Create a seed entry
router.post('/', async (req, res) => {
  try {
    const newSeed = new Seed(req.body);
    await newSeed.save();
    res.status(201).json(newSeed);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all seed entries
router.get('/', async (req, res) => {
  try {
    const seeds = await Seed.find();
    res.json(seeds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a seed entry
router.put('/:id', async (req, res) => {
  try {
    const updatedSeed = await Seed.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSeed);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a seed entry
router.delete('/:id', async (req, res) => {
  try {
    await Seed.findByIdAndDelete(req.params.id);
    res.json({ message: 'Seed entry deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
