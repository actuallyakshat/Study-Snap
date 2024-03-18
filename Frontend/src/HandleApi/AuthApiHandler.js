import axios from "axios";
const baseUrl = `${import.meta.env.VITE_BASE_URL}/auth`;
const getUserDetails = async (user, token) => {
  try {
    if (!user) {
      console.error("Null User Error");
      return;
    }
    const { email, name } = user;
    const response = await axios.post(
      `${baseUrl}/getDetails`,
      {
        email,
        name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error while getting user details:", error);
    throw new Error(error);
  }
};

const deleteUserAccount = async (user) => {
  try {
    if (!user) {
      throw new Error("Null User Error");
    }

    const { email, token } = user;

    const response = await axios.delete(`${baseUrl}/delete-account`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { email },
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting user account:", error.message);
    throw error;
  }
};

export { getUserDetails, deleteUserAccount };
