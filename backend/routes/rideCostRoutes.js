const express = require('express');
const router = express.Router();
const RideCost = require('../models/RideCost');

// Create Ride Cost
router.post('/', async (req, res) => {
  try {
    const rideCost = new RideCost(req.body);
    const saved = await rideCost.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Ride Costs
router.get('/', async (req, res) => {
  try {
    const rideCosts = await RideCost.find().sort({ createdAt: -1 });
    res.json(rideCosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Ride Cost by ID
router.get('/:id', async (req, res) => {
  try {
    const rideCost = await RideCost.findById(req.params.id);
    if (!rideCost) return res.status(404).json({ error: 'Ride cost not found' });
    res.json(rideCost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update Ride Cost
router.put('/:id', async (req, res) => {
  try {
    const updated = await RideCost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Ride cost not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Ride Cost
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await RideCost.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Ride cost not found' });
    res.json({ message: 'Ride cost deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
