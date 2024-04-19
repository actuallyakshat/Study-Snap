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

    const currentDate = new Date();
    const todayDateString = `${("0" + currentDate.getDate()).slice(-2)}/${(
      "0" +
      (currentDate.getMonth() + 1)
    ).slice(-2)}/${currentDate.getFullYear()}`;
    const previousDate = new Date();
    previousDate.setDate(previousDate.getDate() - 1); // Get the previous date

    const previousDay = ("0" + previousDate.getDate()).slice(-2); // Add leading zero if needed
    const previousMonth = ("0" + (previousDate.getMonth() + 1)).slice(-2); // Add leading zero if needed
    const previousYear = previousDate.getFullYear();

    const previousDateString = `${previousDay}/${previousMonth}/${previousYear}`;
    const previousProductivityData = productivityData.find(
      (entry) => entry.date === previousDateString
    );
    const todaysProductivityData = productivityData.find(
      (entry) => entry.date === todayDateString
    );

    if (!previousProductivityData) {
      if (!todaysProductivityData) {
        user.streak = 0;
        await user.save();
      }
    }

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
    res.status(500).json({ message: error.message });
  }
};

// const getDetails = async (req, res) => {
//   try {
//     const { email, name } = req.body;

//     let user = await User.findOne({ email })
//       .populate({
//         path: "todos",
//         options: { sort: { order: 1 } },
//       })
//       .populate({
//         path: "completedTimers",
//         options: { sort: { _id: -1 } },
//       })
//       .populate({
//         path: "folders",
//         populate: { path: "notes" },
//       });

//     if (!user) {
//       user = new User({
//         email,
//         name,
//       });
//       await user.save();
//     }

//     // Fetch productivity data for the user
//     const productivityData = await ProductivityData.find({ email });

//     //Streak Logic
// const currentDate = new Date();
// const todayDateString = `${("0" + currentDate.getDate()).slice(-2)}/${(
//   "0" +
//   (currentDate.getMonth() + 1)
// ).slice(-2)}/${currentDate.getFullYear()}`;
// const previousDate = new Date();
// previousDate.setDate(previousDate.getDate() - 1); // Get the previous date

// const previousDay = ("0" + previousDate.getDate()).slice(-2); // Add leading zero if needed
// const previousMonth = ("0" + (previousDate.getMonth() + 1)).slice(-2); // Add leading zero if needed
// const previousYear = previousDate.getFullYear();

// const previousDateString = `${previousDay}/${previousMonth}/${previousYear}`;
// const previousProductivityData = productivityData.find(
//   (entry) => entry.date === previousDateString
// );
// const todaysProductivityData = productivityData.find(
//   (entry) => entry.date === todayDateString
// );

// if (!previousProductivityData) {
//   if (!todaysProductivityData) {
//     user.streak = 0;
//     await user.save();
//   }
// }

//     // Initialize arrays for weekly, monthly, and yearly summaries
//     const weeklySummary = [
//       { day: "Monday", hours: 0 },
//       { day: "Tuesday", hours: 0 },
//       { day: "Wednesday", hours: 0 },
//       { day: "Thursday", hours: 0 },
//       { day: "Friday", hours: 0 },
//       { day: "Saturday", hours: 0 },
//       { day: "Sunday", hours: 0 },
//     ];

//     // Initialize monthly summary as an array for the current month
//     const today = new Date();
//     const currentYear = today.getFullYear();
//     const currentMonth = today.getMonth() + 1; // Month is 0-indexed
//     const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
//     const monthlySummary = new Array(daysInMonth).fill(0).map((_, index) => ({
//       day: index + 1,
//       hours: 0,
//     }));

//     // Initialize yearly summary as an array of objects
//     const yearlySummary = Array.from({ length: 12 }, (_, i) => ({
//       month: new Date(0, i).toLocaleString("default", { month: "long" }),
//       hours: 0,
//     }));

//     // Calculate start and end dates for the current week (Monday to Sunday)
//     const startOfWeek = new Date(currentDate);
//     startOfWeek.setDate(startOfWeek.getDate() - (startOfWeek.getDay() - 1)); // Start of current week (Monday)
//     const endOfWeek = new Date(currentDate);
//     endOfWeek.setDate(startOfWeek.getDate() + 6); // End of current week (Sunday)

//     // Filter productivity data to include only entries from the current ongoing week
//     const currentWeekData = productivityData.filter((entry) => {
//       const entryDate = new Date(entry.date);
//       return entryDate >= startOfWeek && entryDate <= endOfWeek;
//     });

//     // Iterate through filtered productivity data to update weekly summary
//     currentWeekData.forEach((entry) => {
//       const { date, hoursStudied } = entry;
//       const entryDate = new Date(date);
//       let dayOfWeek = entryDate.getDay(); // 0 for Sunday, 1 for Monday, etc.
//       if (dayOfWeek === 0) dayOfWeek = 7; // Convert Sunday to 7
//       weeklySummary[dayOfWeek - 1].hours += hoursStudied; // Adjust index to start from 0
//     });

//     // Iterate through productivity data to calculate summaries
//     productivityData.forEach((entry) => {
//       const { date, hoursStudied } = entry;
//       const [day, month, year] = date.split("/"); // Split the date string

//       // Update monthly summary if the entry belongs to the current month
//       if (parseInt(month) === currentMonth && parseInt(year) === currentYear) {
//         const dayOfMonth = parseInt(day); // Get the day of the month
//         monthlySummary[dayOfMonth - 1].hours += hoursStudied;
//       }

//       // Update yearly summary
//       const monthName = new Date(`${year}-${month}-${day}`).toLocaleString(
//         "default",
//         { month: "long" }
//       );
//       const monthIndex = yearlySummary.findIndex(
//         (month) => month.month === monthName
//       );
//       yearlySummary[monthIndex].hours += hoursStudied;
//     });

//     res.status(200).json({
//       user: {
//         ...user.toObject(),
//         productivityData: {
//           Weekly: weeklySummary,
//           Monthly: monthlySummary,
//           Yearly: yearlySummary,
//         },
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

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
