const express = require("express");
const router = express.Router();
const {
  getDetails,
  deleteAccount,
  completeProfile,
  getDetailsForProfile,
} = require("../Controllers/AuthController");
const CompletedTimer = require("../Models/CompletedTimers");
require("dotenv").config();

router.post("/get-details", getDetails);
router.delete("/delete-account", deleteAccount);
router.put("/complete-profile", completeProfile);
router.get("/get-profile-details/:username", getDetailsForProfile);

module.exports = router;
