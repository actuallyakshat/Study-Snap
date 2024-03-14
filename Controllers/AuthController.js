const User = require("../Models/User");
const ProductivityData = require("../Models/ProductivityData");

const getDetails = async (req, res) => {
  try {
    const { auth0Id, email, name } = req.body;

    // Fetch user details including todos, completedTimers, and folders
    let user = await User.findOne({ auth0Id })
      .populate({
        path: "todos",
        options: { sort: { order: 1 } },
      })
      .populate({
        path: "completedTimers",
        options: { sort: { _id: -1 } },
      })
      .populate({
        path: "folders",
        populate: { path: "notes" },
      });

    // If user doesn't exist, create a new user
    if (!user) {
      user = new User({
        auth0Id,
        email,
        name,
      });
      await user.save();

      // Fetch the newly created user
      user = await User.findOne({ auth0Id });
    }

    // Fetch productivity data for the user
    const productivityData = await ProductivityData.find({ auth0Id });

    // Initialize arrays for weekly, monthly, and yearly summaries
    const weeklySummary = [
      { day: "Monday", hours: 0 },
      { day: "Tuesday", hours: 0 },
      { day: "Wednesday", hours: 0 },
      { day: "Thursday", hours: 0 },
      { day: "Friday", hours: 0 },
      { day: "Saturday", hours: 0 },
      { day: "Sunday", hours: 0 },
    ];

    // Determine the number of days in the current month
    const daysInMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    ).getDate();

    const monthlySummary = new Array(daysInMonth).fill(0).map((_, index) => ({
      day: index + 1,
      hours: 0,
    }));

    // Initialize yearly summary as an array of objects
    const yearlySummary = Array.from({ length: 12 }, (_, i) => ({
      month: new Date(0, i + 1).toLocaleString("default", { month: "long" }),
      hours: 0,
    }));

    // Iterate through productivity data to calculate summaries
    productivityData.forEach((entry) => {
      const { date, hoursStudied } = entry;
      const [day, month, year] = date.split("/"); // Split the date string

      // Create a date object
      const convertedDate = new Date(`${year}-${month}-${day}`);

      // Adjust day of the week for Monday starting week
      let dayOfWeek = convertedDate.getDay(); // 0 for Sunday, 1 for Monday, etc.
      if (dayOfWeek === 0) dayOfWeek = 7; // Convert Sunday to 7

      // Update weekly summary
      weeklySummary[dayOfWeek - 1].hours += hoursStudied; // Adjust index to start from 0

      // Update monthly summary
      const dayOfMonth = convertedDate.getDate(); // Get the day of the month
      monthlySummary[dayOfMonth - 1].hours += hoursStudied;

      // Update yearly summary
      const monthName = new Date(convertedDate).toLocaleString("default", {
        month: "long",
      });
      const monthIndex = yearlySummary.findIndex(
        (month) => month.month === monthName
      );
      yearlySummary[monthIndex].hours += hoursStudied;
    });

    res.status(200).json({
      user: {
        ...user.toObject(),
        productivityData: {
          Weekly: weeklySummary,
          Monthly: monthlySummary,
          Yearly: yearlySummary,
        },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const editProfile = async (req, res) => {
  try {
    const { auth0Id, newName } = req.body;
    const user = await User.findOne({ auth0Id: auth0Id });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found." });
    }
    user.name = newName;

    await user.save();

    res.status(200).json({
      success: true,
      message: "User name updated successfully.",
      user,
    });
  } catch (error) {
    console.error("Error changing user name:", error);
    // Return error response
    res.status(500).json({
      success: false,
      error: "Server error. Failed to update user name.",
    });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const auth0Id = req.body.auth0Id;
    const user = await User.findOne({ auth0Id: auth0Id });
    if (user) {
      await user.deleteOne();
    } else if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "User account deleted successfully" });
  } catch (error) {
    console.error("Error deleting user account:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

module.exports = {
  getDetails,
  editProfile,
  deleteAccount,
};
