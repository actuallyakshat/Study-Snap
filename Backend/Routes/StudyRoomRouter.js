const express = require("express");
const router = express.Router();
const {
  createStudyRoom,
  getRoomDetails,
  joinStudyRoom,
} = require("../Controllers/StudyRoomController");
router.post("/create-room", createStudyRoom);
router.get("/get-room-details/:roomCode", getRoomDetails);
router.put("/join-room", joinStudyRoom);

module.exports = router;
