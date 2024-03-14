const mongoose = require("mongoose");

const productivityDataSchema = new mongoose.Schema({
  auth0Id: { type: String, required: true },
  date: { type: String },
  hoursStudied: { type: Number, required: true },
  month: { type: Number, default: new Date().getMonth() + 1 },
  day: { type: Number, default: new Date().getDate() },
});

// Define a method to get current date as string in "DD/MM/YYYY" format
function currentDateAsString() {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = String(currentDate.getFullYear());
  return `${day}/${month}/${year}`;
}

// productivityDataSchema.pre("save", function (next) {
//   this.date = currentDateAsString();
//   next();
// });

const ProductivityData = mongoose.model(
  "ProductivityData",
  productivityDataSchema
);

module.exports = ProductivityData;
