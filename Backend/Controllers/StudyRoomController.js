const { StudyRoom } = require("../Models/StudyRoom");
const User = require("../Models/User");
const createStudyRoom = async (req, res) => {
  try {
    const { title, roomCode, ownerId } = req.body;

    if (!title || !roomCode || !ownerId) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existingStudyRoom = await StudyRoom.findOne({ ownerId });
    if (existingStudyRoom) {
      return res
        .status(400)
        .json({ success: false, message: "User already has a study room" });
    }

    const studyRoom = new StudyRoom({
      title,
      roomCode,
      ownerId,
    });
    await studyRoom.save();
    User.updateOne({ _id: ownerId }, { $push: { studyRoom: studyRoom._id } });
    res.status(201).json({ success: true, studyRoom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getRoomDetails = async (req, res) => {
  try {
    const { roomCode } = req.params;
    if (!roomCode) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const studyRoom = await StudyRoom.findOne({ roomCode: roomCode }).populate({
      path: "ownerId members messages",
    });
    if (!studyRoom) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    }
    return res.status(200).json({ success: true, studyRoom });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const joinStudyRoom = async (req, res) => {
  try {
    const { roomCode, userId } = req.body;
    if (!roomCode) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const studyRoom = await StudyRoom.findOne({ roomCode: roomCode });
    if (!studyRoom) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (user.studyRoom.includes(studyRoom._id)) {
      return res
        .status(400)
        .json({ success: false, message: "User already joined" });
    }
    user.studyRoom.push(studyRoom._id);
    await user.save();
    res.status(200).json({ success: true, message: "User joined" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = { createStudyRoom, getRoomDetails, joinStudyRoom };
