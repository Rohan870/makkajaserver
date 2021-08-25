const mongoose = require("mongoose");

const med_data = mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Object,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
  },
  short: {
    type: String,
  },
  weight: {
    type: String,
  },
  size: {
    type: String,
  },
});
const model = mongoose.model("Med_data", med_data);
module.exports = model;
