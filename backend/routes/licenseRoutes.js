const express = require('express');
const License = require('../models/License');
const router = express.Router();

// Create a license
router.post('/', async (req, res) => {
  try {
    const newLicense = new License(req.body);
    await newLicense.save();
    res.status(201).json(newLicense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all licenses
router.get('/', async (req, res) => {
  try {
    const licenses = await License.find();
    res.json(licenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a license
router.put('/:id', async (req, res) => {
  try {
    const updatedLicense = await License.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedLicense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a license
router.delete('/:id', async (req, res) => {
  try {
    await License.findByIdAndDelete(req.params.id);
    res.json({ message: 'License deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
