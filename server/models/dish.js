const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema({
  restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: mongoose.Types.Decimal128, required: true },
  isAvailable: { type: Boolean, default: true },
  photo_url: { type: String },
  created_at: { type: Date, default: Date.now },
});

dishSchema.index({ restaurant_id: 1 });

module.exports = mongoose.model("Dish", dishSchema);
