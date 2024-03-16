import axios from "axios";
const baseUrl = `${import.meta.env.VITE_BASE_URL}/timer`;

const saveCompletedTimer = async (duration, date, time, user) => {
  try {
    if (duration < 20) return;
    if (!user) {
      console.error("Null User Error");
      return;
    }
    const { sub: auth0Id, token } = user;
    const response = await axios.post(
      `${baseUrl}/save-completed-timer`,
      {
        duration,
        date,
        time,
        auth0Id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error while saving a completed timer:", error);
  }
};
export { saveCompletedTimer };
