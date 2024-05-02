const User = require("../Models/User");
const Friendship = require("../Models/Friendship");
async function sendRequest(req, res) {
  const { senderId, receiverId } = req.body;

  try {
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingRequest = await Friendship.findOne({
      sender: senderId,
      receiver: receiverId,
      status: "pending",
    });

    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "Friendship request already sent" });
    }

    const friendshipRequest = new Friendship({
      sender: senderId,
      receiver: receiverId,
      status: "pending",
    });

    await friendshipRequest.save();

    res.status(201).json({ message: "Friendship request sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function cancelRequest(req, res) {
  const { requestId } = req.params;

  try {
    const request = await Friendship.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Friendship request not found" });
    }

    await request.remove();

    res
      .status(200)
      .json({ message: "Friendship request cancelled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function acceptRequest(req, res) {
  const { requestId } = req.params;

  try {
    const request = await Friendship.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Friendship request not found" });
    }

    request.status = "accepted";
    await request.save();

    res
      .status(200)
      .json({ message: "Friendship request accepted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function rejectRequest(req, res) {
  const { requestId } = req.params;

  try {
    const request = await Friendship.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Friendship request not found" });
    }

    request.status = "rejected";
    await request.save();

    res
      .status(200)
      .json({ message: "Friendship request rejected successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getAllFriends(req, res) {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("friends");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.friends);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  sendRequest,
  cancelRequest,
  acceptRequest,
  rejectRequest,
  getAllFriends,
};
