import axios from "axios";
const baseUrl = `${import.meta.env.VITE_BASE_URL}/auth`;

const checkIfAuthenticated = async () => {
  const response = await axios.get(`${baseUrl}/check`, {
    withCredentials: true,
  });
  if (response) return response.data.user;
};

const logoutUser = async () => {
  await axios.post(`${baseUrl}/logout`, null, { withCredentials: true });
};

const getUserDetails = async (user) => {
  try {
    if (!user) {
      console.error("Null User Error");
      return;
    }
    const { email, name } = user;

    const response = await axios.post(`${baseUrl}/getDetails`, {
      email,
      name,
    });
    return response.data.user;
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

    const { email } = user;

    const response = await axios.delete(`${baseUrl}/delete-account`, {
      data: { email },
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting user account:", error.message);
    throw error;
  }
};

export { logoutUser, checkIfAuthenticated, getUserDetails, deleteUserAccount };
