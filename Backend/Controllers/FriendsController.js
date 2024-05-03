const User = require("../Models/User");
const Friendship = require("../Models/Friendship");
async function sendRequest(req, res) {
  const { senderId, receiverId } = req.body;

  try {
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const existingRequest = await Friendship.findOne({
      sender: senderId,
      receiver: receiverId,
      status: "pending",
    });

    if (existingRequest) {
      return res
        .status(400)
        .json({ success: false, message: "Friend request already sent" });
    }

    const exisitingIncomingRequest = await Friendship.findOne({
      sender: receiverId,
      receiver: senderId,
      status: "pending",
    });

    if (exisitingIncomingRequest) {
      return res
        .status(400)
        .json({ success: false, message: "Friend request already received" });
    }

    const friendshipRequest = new Friendship({
      sender: senderId,
      receiver: receiverId,
      status: "pending",
    });

    await friendshipRequest.save();

    await Promise.all([
      sender.updateOne({ $push: { friends: friendshipRequest._id } }),
      receiver.updateOne({ $push: { friends: friendshipRequest._id } }),
    ]);

    res
      .status(201)
      .json({ success: true, message: "Friendship request sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

async function cancelRequest(req, res) {
  const { requestId } = req.body;

  try {
    const request = await Friendship.findById(requestId);
    console.log(requestId);
    console.log(request);

    if (!request) {
      return res
        .status(404)
        .json({ success: false, message: "Friendship request not found" });
    }

    const [sender, receiver] = await Promise.all([
      User.findById(request.sender._id),
      User.findById(request.receiver._id),
    ]);

    await Friendship.deleteOne({ _id: requestId });

    await Promise.all([
      sender.updateOne({ $pull: { friends: request._id } }),
      receiver.updateOne({ $pull: { friends: request._id } }),
    ]);

    res.status(200).json({
      success: true,
      message: "Friendship request cancelled successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

async function acceptRequest(req, res) {
  const { requestId } = req.body;

  try {
    const request = await Friendship.findById(requestId);

    if (!request) {
      return res
        .status(404)
        .json({ success: false, message: "Friendship request not found" });
    }

    request.status = "accepted";
    await request.save();

    res.status(200).json({
      success: true,
      message: "Friendship request accepted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

async function rejectRequest(req, res) {
  const { requestId } = req.body;
  

  try {
    const request = await Friendship.findById(requestId);

    if (!request) {
      return res
        .status(404)
        .json({ success: false, message: "Friendship request not found" });
    }

    request.status = "rejected";
    await request.save();

    res.status(200).json({
      success: true,
      message: "Friendship request rejected successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

async function getAllFriends(req, res) {
  const { userId } = req.query;
  console.log("userid to get all friends", userId);
  try {
    const user = await User.findById(userId).populate({
      path: "friends",
      populate: {
        path: "sender receiver",
        populate: { path: "friends" },
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, friends: user.friends });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

async function searchUsers(req, res) {
  const { searchQuery } = req.params;
  try {
    // Search all users in the database
    const users = await User.find({
      username: { $regex: `^${searchQuery}`, $options: "i" },
    });

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
module.exports = {
  sendRequest,
  cancelRequest,
  acceptRequest,
  rejectRequest,
  getAllFriends,
  searchUsers,
};
