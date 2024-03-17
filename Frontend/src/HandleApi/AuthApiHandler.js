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
  }
};

const updateUser = async (user, newName) => {
  try {
    if (!user) {
      console.error("Null User Error");
      return;
    }
    const auth0Id = user.auth0Id;
    const { token } = user;
    const response = await axios.put(
      `${baseUrl}/edit-profile`,
      {
        auth0Id,
        newName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

const deleteUserAccount = async (user) => {
  try {
    if (!user) {
      throw new Error("Null User Error");
    }

    const { auth0Id, token } = user;

    const response = await axios.delete(`${baseUrl}/delete-account`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { auth0Id },
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting user account:", error.message);
    throw error;
  }
};

export { getUserDetails, updateUser, deleteUserAccount };
