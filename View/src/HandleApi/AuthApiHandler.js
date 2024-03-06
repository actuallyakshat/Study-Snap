import axios from "axios";
const baseUrl = "http://localhost:8000/api/v1/auth";

const getUserDetails = async (user) => {
  try {
    if (!user) {
      console.error("Null User Error");
      return;
    }
    console.log(user);
    const { nickname, token, email, sub: auth0Id } = user;
    const response = await axios.post(
      `${baseUrl}/getDetails`,
      {
        name: nickname,
        auth0Id,
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Response from get all user controller: ", response);
    return response;
  } catch (error) {
    console.error("Error while getting user details:", error);
  }
};

export { getUserDetails };
