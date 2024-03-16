const mongoose = require("mongoose");

const productivityDataSchema = new mongoose.Schema({
  auth0Id: { type: String, required: true },
  date: { type: String },
  hoursStudied: { type: Number, required: true },
  month: { type: Number, default: new Date().getMonth() + 1 },
  day: { type: Number, default: new Date().getDate() },
});

const ProductivityData = mongoose.model(
  "ProductivityData",
  productivityDataSchema
);

module.exports = ProductivityData;
