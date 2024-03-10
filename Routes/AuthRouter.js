const express = require("express");
const router = express.Router();
const {
  getDetails,
  editProfile,
  deleteAccount,
} = require("../Controllers/AuthController");

router.post("/getDetails", getDetails);
router.put("/edit-profile", editProfile);
router.delete("/delete-account", deleteAccount);

module.exports = router;
