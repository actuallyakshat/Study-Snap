const User = require("../Models/User");
const ProductivityData = require("../Models/ProductivityData");
const Note = require("../Models/Note");

const getDetails = async (req, res) => {
  try {
    const { email, name } = req.body;
    let user = await User.findOne({ email })
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

    if (!user) {
      user = new User({
        email,
        name,
      });
      await user.save();

      user = await User.findOne({ email }).populate({
        path: "folders",
        populate: { path: "notes" },
      });
    }
    const productivityData = await ProductivityData.find({ email });

    const startOfWeek = new Date();
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(
      startOfWeek.getDate() -
        (startOfWeek.getDay() === 0 ? 6 : startOfWeek.getDay() - 1)
    );

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);

    // Adjust end of week to include Sunday of next week
    const endOfWeekNextSunday = new Date(endOfWeek);
    endOfWeekNextSunday.setDate(endOfWeekNextSunday.getDate() + 1);

    const weeklySummary = [
      { day: "Monday", hours: 0 },
      { day: "Tuesday", hours: 0 },
      { day: "Wednesday", hours: 0 },
      { day: "Thursday", hours: 0 },
      { day: "Friday", hours: 0 },
      { day: "Saturday", hours: 0 },
      { day: "Sunday", hours: 0 },
    ];

    productivityData.forEach((entry) => {
      const { date, hoursStudied } = entry;
      const [day, month, year] = date.split("/");
      const entryDate = new Date(`${year}-${month}-${day}`);

      if (entryDate >= startOfWeek && entryDate <= endOfWeekNextSunday) {
        let dayOfWeek = entryDate.getDay() === 0 ? 6 : entryDate.getDay() - 1; // Adjust for Sunday as last day
        weeklySummary[dayOfWeek].hours += hoursStudied;
      }
    });

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    const monthlySummary = new Array(daysInMonth).fill(0).map((_, index) => ({
      day: index + 1,
      hours: 0,
    }));

    const yearlySummary = Array.from({ length: 12 }, (_, i) => ({
      month: new Date(0, i).toLocaleString("default", { month: "long" }),
      hours: 0,
    }));

    productivityData.forEach((entry) => {
      const { date, hoursStudied } = entry;
      const [day, month, year] = date.split("/");
      const convertedDate = new Date(`${year}-${month}-${day}`);

      if (
        convertedDate.getMonth() + 1 === currentMonth &&
        convertedDate.getFullYear() === currentYear
      ) {
        monthlySummary[convertedDate.getDate() - 1].hours += hoursStudied;
      }

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

const deleteAccount = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (user) {
      await Note.deleteMany({ folder: { $in: user.folders } });
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
  deleteAccount,
};
