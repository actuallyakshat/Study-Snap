const CompletedTimer = require("../models/completedTimer");

const saveCompletedTimer = async (req, res) => {
  try {
    const { duration, date, time } = req.body;

    if (!duration || !date || !time) {
      return res.status(400).json({
        success: false,
        error: "Duration, date, and time are required.",
      });
    }

    if (duration <= 20) {
      return res
        .status(400)
        .json({ success: false, error: "Duration must be greater than 20." });
    }

    const completedTimer = new CompletedTimer({
      duration,
      date,
      time,
    });

    await completedTimer.save();

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
