// models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    unique: true,
    minlength: [2, 'Category name must be at least 2 characters long'],
    maxlength: [50, 'Category name cannot exceed 50 characters']
  }
}, {
  timestamps: true // This will add createdAt and updatedAt fields
});

// Index for faster queries
categorySchema.index({ name: 1 });

// Virtual to transform _id to id for frontend consistency
categorySchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialized
categorySchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;