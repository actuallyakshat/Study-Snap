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
    if (!request) {
      return res
        .status(404)
        .json({ success: false, message: "Friendship request not found" });
    }

    if (request.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Friendship request already accepted",
      });
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

    await Promise.all([
      User.updateOne(
        { _id: request.sender._id },
        { $pull: { friends: requestId } }
      ),
      User.updateOne(
        { _id: request.receiver._id },
        { $pull: { friends: requestId } }
      ),
      request.deleteOne(),
    ]);

    res.status(200).json({
      success: true,
      message: "Friendship request rejected successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

async function removeFriend(req, res) {
  const { friendshipId, user1, user2 } = req.body;

  try {
    const friendship = await Friendship.findOne({
      _id: friendshipId,
    });

    if (!friendship) {
      return res
        .status(404)
        .json({ success: false, message: "Friendship not found" });
    }
    await Friendship.deleteOne({ _id: friendshipId });
    await Promise.all([
      User.updateOne({ _id: user1 }, { $pull: { friends: friendshipId } }),
      User.updateOne({ _id: user2 }, { $pull: { friends: friendshipId } }),
    ]);

    res
      .status(200)
      .json({ success: true, message: "Friend removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
async function getAllFriends(req, res) {
  const { userId } = req.query;
  try {
    const user = await User.findById(userId).populate({
      path: "friends",
      populate: {
        path: "sender receiver",
        populate: { path: "friends" },
        populate: { path: "productivityData" },
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
      username: { $regex: searchQuery, $options: "i" },
    }).populate({
      path: "friends",
      populate: {
        path: "sender receiver", // Assuming 'sender' and 'receiver' are fields in the Friendship schema
        populate: { path: "friends" },
      },
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
  removeFriend,
};
