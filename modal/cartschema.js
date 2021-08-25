const mongoose = require("mongoose");

const cart = mongoose.Schema({
  products: [
    {
      productId: {
        type: String,
      },
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      price: {
        type: Array,
      },
      image: {
        type: String,
      },
      category: {
        type: String,
      },
      weight: {
        type: String,
      },
      dimensions: {
        type: String,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
  ],

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});
const model = mongoose.model("Cart", cart);
module.exports = model;
