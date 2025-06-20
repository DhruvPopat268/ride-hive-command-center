const express = require('express');
const router = express.Router();
const SubCategory = require('../models/SubCategory');
const Category = require('../models/Category');

// Get all subcategories
router.get('/', async (req, res) => {
  try {
    const subcategories = await SubCategory.find().populate('categoryId', 'name');
    res.json(subcategories.map(sub => ({
      id: sub._id,
      name: sub.name,
      categoryId: sub.categoryId._id,
      categoryName: sub.categoryId.name
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create subcategory
router.post('/', async (req, res) => {
  const { name, categoryId } = req.body;
  try {
    const subCategory = await SubCategory.create({ name, categoryId });
    res.status(201).json(subCategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update subcategory
router.put('/:id', async (req, res) => {
  const { name, categoryId } = req.body;
  try {
    const updated = await SubCategory.findByIdAndUpdate(
      req.params.id,
      { name, categoryId },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete subcategory
router.delete('/:id', async (req, res) => {
  try {
    await SubCategory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
