const CompletedTimer = require("../Models/CompletedTimers");
const User = require("../Models/User");

// Controller function to save a completed timer entry
const saveCompletedTimer = async (req, res) => {
  try {
    const { duration, date, time, email } = req.body;

    // Check if required fields are provided
    if (!duration || !date || !time || !email) {
      return res.status(400).json({
        success: false,
        error: "Duration, date, time, and email are required.",
      });
    }

    if (duration < 20) {
      return res.status(400).json({
        success: false,
        error: "Duration must be greater than 20 minutes.",
      });
    }

    const completedTimer = new CompletedTimer({
      duration,
      date,
      time,
    });

    // Save the completed timer to the database
    await completedTimer.save();

    // Update user's completedTimer array
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found." });
    }
    user.completedTimers.push(completedTimer._id);
    await user.save();

    res.status(201).json({
      success: true,
      message: "Completed timer saved successfully.",
      completedTimer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Server error. Failed to save completed timer.",
    });
  }
};

module.exports = { saveCompletedTimer };
