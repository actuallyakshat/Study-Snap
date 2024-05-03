import axios from "axios";
const baseUrl = `${import.meta.env.VITE_BASE_URL}/auth`;

const checkIfAuthenticated = async () => {
  const response = await axios.get(`${baseUrl}/check`, {
    withCredentials: true,
  });
  if (response) return response.data.user;
};

const getUserDetails = async (user) => {
  try {
    if (!user) {
      console.error("Null User Error");
      return;
    }

    const { email, name, profilePicture } = user;

    const response = await axios.post(`${baseUrl}/get-details`, {
      email,
      name,
      profilePicture,
    });
    return response.data.user;
  } catch (error) {
    console.error("Error while getting user details:", error);
    throw new Error(error);
  }
};

const completeProfile = async (email, username, age, bio) => {
  try {
    const response = await axios.put(`${baseUrl}/complete-profile`, {
      email,
      username,
      age,
      bio,
    });
    return response.data;
  } catch (error) {
    console.error("Error while setting username:", error);
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

const getProfileDetails = async (username) => {
  try {
    if (!username) {
      console.error("No Username Provided");
      return;
    }

    const response = await axios.get(
      `${baseUrl}/get-profile-details/${username}`,
    );
    return response.data.user;
  } catch (error) {
    console.error("Error while getting user details:", error);
    throw new Error(error);
  }
};

export {
  checkIfAuthenticated,
  getUserDetails,
  deleteUserAccount,
  completeProfile,
  getProfileDetails,
};
