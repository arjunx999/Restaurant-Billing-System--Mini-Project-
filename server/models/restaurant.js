const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  address: { type: String },
  contact: { type: String },
  isOpen: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
});

restaurantSchema.index({ owner_id: 1 });

module.exports = mongoose.model("Restaurant", restaurantSchema);
