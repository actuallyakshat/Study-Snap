const ProductivityData = require("../Models/ProductivityData");
const User = require("../Models/User");
const moment = require("moment");

const addProductivityData = async (req, res) => {
  try {
    const { auth0Id, date, month, week, day, hoursStudied } = req.body;

    let existingProductivityData = await ProductivityData.findOne({
      auth0Id,
      date: date,
    });

    if (existingProductivityData) {
      existingProductivityData.hoursStudied = hoursStudied;
      await existingProductivityData.save();
    } else {
      existingProductivityData = new ProductivityData({
        auth0Id,
        date: date,
        month,
        week,
        day,
        hoursStudied,
      });
      await existingProductivityData.save();

      await User.updateOne(
        { auth0Id },
        { $push: { productivityData: existingProductivityData._id } }
      );
    }

    res.status(201).json({
      success: true,
      message: "Productivity data added successfully",
      existingProductivityData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const setStudyTarget = async (req, res) => {
  try {
    const { auth0Id, studyTarget } = req.body;
    if (!studyTarget || !auth0Id) {
      return res.status(400).json({
        success: false,
        message: "studyTarget and auth0Id are required",
      });
    }

    const user = await User.findOneAndUpdate(
      { auth0Id: auth0Id },
      { studyTarget: studyTarget }
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Study Target Updated!" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  addProductivityData,
  setStudyTarget,
};
