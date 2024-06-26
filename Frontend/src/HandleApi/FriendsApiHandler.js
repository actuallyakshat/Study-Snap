import axios from "axios";
const baseUrl = `${import.meta.env.VITE_BASE_URL}/friends`;

const searchFriends = async (searchQuery) => {
  try {
    const response = await axios.get(`${baseUrl}/search/${searchQuery}`);
    return response.data;
  } catch (error) {
    console.error("Error searching friends:", error);
    return { success: false, message: "Failed to search friends" };
  }
};

// Function to send a friendship request
const sendRequest = async (senderId, receiverId) => {
  try {
    const response = await axios.post(`${baseUrl}/send-request`, {
      senderId,
      receiverId,
    });
    return response.data;
  } catch (e) {
    console.log(e);
    return { success: false, message: e.response.data.message };
  }
};

// Function to cancel a friendship request
const cancelRequest = async (requestId) => {
  try {
    const response = await axios.delete(`${baseUrl}/cancel-request`, {
      data: {
        requestId: requestId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error cancelling friendship request:", error);
    return { success: false, message: error.response.data.message };
  }
};

// Function to accept a friendship request
const acceptRequest = async (requestId) => {
  try {
    const response = await axios.put(`${baseUrl}/accept-request`, {
      requestId: requestId,
    });
    return response.data;
  } catch (error) {
    console.error("Error accepting friendship request:", error);
    return { success: false, message: "Failed to accept friendship request" };
  }
};

// Function to reject a friendship request
const rejectRequest = async (requestId) => {
  try {
    const response = await axios.put(`${baseUrl}/reject-request`, {
      requestId: requestId,
    });
    return response.data;
  } catch (error) {
    console.error("Error rejecting friendship request:", error);
    return { success: false, message: "Failed to reject friendship request" };
  }
};

//Remove a friend
const removeFriend = async (friendshipId, user1, user2) => {
  try {
    const response = await axios.put(`${baseUrl}/remove-friend`, {
      friendshipId: friendshipId,
      user1: user1,
      user2: user2,
    });
    return response.data;
  } catch (e) {
    console.error(e);
    return { success: false, message: "Failed to remove friend" };
  }
};

// Function to get all friends of a user
const getAllFriends = async (userId) => {
  try {
    const response = await axios.get(`${baseUrl}/get-all-friends`, {
      params: {
        userId: userId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting all friends:", error);
    return { success: false, message: "Failed to get all friends" };
  }
};
export {
  sendRequest,
  cancelRequest,
  acceptRequest,
  rejectRequest,
  getAllFriends,
  searchFriends,
  removeFriend,
};
