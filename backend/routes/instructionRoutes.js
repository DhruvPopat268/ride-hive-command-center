
const express = require('express');
const router = express.Router();
const Instruction = require('../models/Instruction');

// Create instruction
router.post('/', async (req, res) => {
  try {
    const instruction = new Instruction(req.body);
    await instruction.save();
    res.status(201).json({ success: true, data: instruction });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Get all instructions
router.get('/', async (req, res) => {
  try {
    const instructions = await Instruction.find().sort({ createdAt: -1 });
    res.json({ success: true, data: instructions });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update instruction
router.put('/:id', async (req, res) => {
  try {
    const instruction = await Instruction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!instruction) return res.status(404).json({ success: false, message: 'Instruction not found' });
    res.json({ success: true, data: instruction });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Delete instruction
router.delete('/:id', async (req, res) => {
  try {
    const instruction = await Instruction.findByIdAndDelete(req.params.id);
    if (!instruction) return res.status(404).json({ success: false, message: 'Instruction not found' });
    res.json({ success: true, message: 'Instruction deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
