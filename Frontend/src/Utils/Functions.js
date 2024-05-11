export function getTotalHoursStudiedThisMonthByUser(users) {
  // Get current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed, so adding 1
  const currentYear = currentDate.getFullYear();

  // Initialize an object to store total hours studied for each user
  const totalHoursByUser = [];

  // Loop through each user
  users.forEach((user) => {
    // Initialize total hours studied for the user
    let totalHoursStudied = 0;

    // Loop through productivity data of the user
    user.productivityData.forEach((data) => {
      // Check if the productivity data is from the ongoing month and year
      if (
        data.month === currentMonth &&
        parseInt(data.date.split("/")[2]) === currentYear
      ) {
        totalHoursStudied += data.hoursStudied;
      }
    });

    // Store total hours studied for the user
    totalHoursByUser.push({ name: user.name, hours: totalHoursStudied });
  });

  return totalHoursByUser;
}

export function sumHours(name, data) {
  let totalHours = 0;
  data.forEach((entry) => {
    totalHours += entry.hours;
  });
  return { name: name, hours: totalHours };
}
