const mongoose = require('mongoose');

const rideCostSchema = new mongoose.Schema({
  modelName: { type: String, required: true },
  baseFare: { type: Number,  },
  minKmIncluded: { type: Number, },
  extraPerKm: { type: Number,},
  includedMinutes: { type: Number,},
  extraPerMin: { type: Number, },
  pickCharges: { type: Number,  },
  nightCharges: { type: Number,  },
  cancellationFee: { type: Number, },
  insurance: { type: Number, },
  extraChargesFromAdmin: { type: Number, },
  gst:{ type: Number, },
  discount: { type: Number, },
  peakHoursChargePerKm: { type: Number, },
  peakHoursChargePerMin: { type: Number, },
  peakDateChargePerKm: { type: Number, },
  peakDateChargePerMin: { type: Number, }
}, { timestamps: true });

module.exports = mongoose.model('RideCost', rideCostSchema);
