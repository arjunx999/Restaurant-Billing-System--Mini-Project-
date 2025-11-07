import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
  ],
  dishes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dish",
      required: true,
    },
  ],
});

export const Restaurant = mongoose.model("Restaurant", restaurantSchema);
