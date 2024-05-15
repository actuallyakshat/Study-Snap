import axios from "axios";
const baseUrl = `${import.meta.env.VITE_BASE_URL}/study-room`;

const createStudyRoom = async (title, roomCode, ownerId) => {
  try {
    const response = await axios.post(`${baseUrl}/create-room`, {
      title,
      roomCode,
      ownerId,
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error.response.data.message);
    return { success: false, message: error.response.data.message };
  }
};

const getRoomDetails = async (roomCode) => {
  try {
    const response = await axios.get(`${baseUrl}/get-room-details/${roomCode}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error.response.data.message);
    return { success: false, message: error.response.data.message };
  }
};

const joinStudyRoom = async (roomCode, userId) => {
  try {
    const response = await axios.get(`${baseUrl}/join-room`, {
      roomCode,
      userId,
    });
    return response.data;
  } catch (error) {
    console.error("Error", error.response.data.message);
    return { success: false, message: error.response.data.message };
  }
};

export { createStudyRoom, getRoomDetails, joinStudyRoom };
