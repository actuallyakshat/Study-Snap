export function getTotalHoursStudiedThisMonthByUser(users) {
  console.log("for computation", users);
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const totalHoursByUser = [];
  users.forEach((user) => {
    let totalHoursStudied = 0;
    user.productivityData.forEach((data) => {
      if (
        data.month === currentMonth &&
        parseInt(data.date.split("/")[2]) === currentYear
      ) {
        totalHoursStudied += data.hoursStudied;
      }
    });

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

export function findCommonFriendshipId(array1, array2) {
  const idSet = new Set();
  for (const obj1 of array1) {
    idSet.add(obj1._id);
  }
  for (const obj2 of array2) {
    if (idSet.has(obj2._id)) {
      return obj2._id;
    }
  }
  return null;
}
