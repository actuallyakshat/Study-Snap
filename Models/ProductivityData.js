const mongoose = require("mongoose");

const productivityDataSchema = new mongoose.Schema({
  auth0Id: { type: String, required: true },
  date: { type: String },
  hoursStudied: { type: Number, required: true },
  // week: { type: Number, default: getWeekNumber(new Date()) },
  month: { type: Number, default: new Date().getMonth() + 1 },
  day: { type: Number, default: new Date().getDate() },
});

// function getWeekNumber(date) {
//   // Copy date so don't modify original
//   date = new Date(
//     Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
//   );
//   // Set to nearest Thursday: current date + 4 - current day number
//   // Make Sunday's day number 7
//   date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
//   // Get first day of year
//   var yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
//   // Calculate full weeks to nearest Thursday
//   var weekNo = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
//   // Return week number
//   return weekNo;
// }

const ProductivityData = mongoose.model(
  "ProductivityData",
  productivityDataSchema
);

module.exports = ProductivityData;
