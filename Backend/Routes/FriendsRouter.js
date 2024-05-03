const express = require("express");
const {
  searchUsers,
  sendRequest,
  cancelRequest,
  getAllFriends,
  acceptRequest,
  rejectRequest,
} = require("../Controllers/FriendsController");
const router = express.Router();

router.get("/search/:searchQuery", searchUsers);
router.post("/send-request", sendRequest);
router.delete("/cancel-request", cancelRequest);
router.get("/get-all-friends", getAllFriends);
router.put("/accept-request", acceptRequest);
router.put("/reject-request", rejectRequest);

module.exports = router;
