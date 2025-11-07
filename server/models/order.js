const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  dish_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dish",
    required: true,
  },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit_price: { type: mongoose.Types.Decimal128, required: true },
  total_price: { type: mongoose.Types.Decimal128, required: true },
});

const OrderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  orderItems: [OrderItemSchema],
  total_amount: { type: mongoose.Types.Decimal128, required: true },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "paid", "cancelled", "completed"],
  },
  placed_at: { type: Date, default: Date.now },
});

OrderSchema.index({ user_id: 1, placed_at: -1 });
OrderSchema.index({ restaurant_id: 1, placed_at: -1 });

module.exports = mongoose.model("Order", OrderSchema);
