const ProductivityData = require("../Models/ProductivityData");
const User = require("../Models/User");

const addProductivityData = async (req, res) => {
  try {
    const { email, date, month, week, day, hoursStudied } = req.body;
    let existingProductivityData = await ProductivityData.findOne({
      email,
      date: date,
    });

    if (existingProductivityData) {
      existingProductivityData.hoursStudied = hoursStudied;
      await existingProductivityData.save();
    } else {
      existingProductivityData = new ProductivityData({
        email,
        date: date,
        month,
        week,
        day,
        hoursStudied,
      });
      await existingProductivityData.save();

      await User.updateOne(
        { email },
        {
          $push: { productivityData: existingProductivityData._id },
          $inc: { streak: 1 },
        }
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
    const { email, studyTarget } = req.body;
    if (!studyTarget || !email) {
      return res.status(400).json({
        success: false,
        message: "studyTarget and email are required",
      });
    }

    const user = await User.findOneAndUpdate(
      { email: email },
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
