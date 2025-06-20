const mongoose = require('mongoose');

const rideCostSchema = new mongoose.Schema({
  modelName: { type: String, required: true },
  baseFare: { type: Number, required: true },
  minKmIncluded: { type: Number, required: true },
  extraPerKm: { type: Number, required: true },
  includedMinutes: { type: Number, required: true },
  extraPerMin: { type: Number, required: true },
  pickCharges: { type: Number, required: true },
  nightCharges: { type: Number, required: true },
  cancellationFee: { type: Number, required: true },
  insurance: { type: Number, required: true },
  extraChargesFromAdmin: { type: Number, required: true },
  discount: { type: Number, required: true },
  peakHoursChargePerKm: { type: Number, required: true },
  peakHoursChargePerMin: { type: Number, required: true },
  peakDateChargePerKm: { type: Number, required: true },
  peakDateChargePerMin: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('RideCost', rideCostSchema);
