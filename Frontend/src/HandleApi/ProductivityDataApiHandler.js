import axios from "axios";
const baseUrl = `${import.meta.env.VITE_BASE_URL}/productivity`;

const setStudyTarget = async (email, studyTarget, token) => {
  try {
    const response = await axios.put(
      `${baseUrl}/set-target`,
      {
        email,
        studyTarget: studyTarget,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error:", error.response.data.message);
    return null;
  }
};

const addProductivityData = async (email, hoursStudied, token) => {
  try {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); // January is 0
    const year = today.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    const response = await axios.post(
      `${baseUrl}/add-data`,
      {
        email,
        hoursStudied: hoursStudied,
        date: formattedDate,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error:", error.response.data.message);
    return null;
  }
};

export { setStudyTarget, addProductivityData };
