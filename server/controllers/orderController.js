import { Order } from "../models/order.js";
import { Dish } from "../models/dish.js";
import { Restaurant } from "../models/restaurant.js";
import { jsPDF } from "jspdf";

export const billOrder = async (req, res) => {
  try {
    const { dishes } = req.body;
    const restaurant = req.user.restaurant;

    const dishDetails = await Dish.find({ _id: { $in: dishes } });

    let totalAmount = 0;
    dishDetails.forEach((d) => (totalAmount += d.price));

    const order = new Order({
      restaurant,
      dishes,
      total_amount: totalAmount,
    });

    await order.save();

    const pdf = new jsPDF();

    pdf.text("Order Invoice", 20, 20);
    pdf.text(`Order: ${order._id}`, 20, 30);
    pdf.text(`Restaurant: ${restaurant}`, 20, 40);
    pdf.text(`Total: ₹${totalAmount}`, 20, 50);

    let y = 65;
    dishDetails.forEach((d) => {
      pdf.text(`- ${d.name} : ₹${d.price}`, 20, y);
      y += 10;
    });

    const pdfBuffer = pdf.output("nodebuffer");

    res.type("pdf").send(pdfBuffer);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const restaurant = req.user.restaurant;

    const orders = await Order.find({ restaurant });

    return res.status(200).json({
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};
