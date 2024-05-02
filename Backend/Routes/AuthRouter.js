const express = require("express");
const router = express.Router();
const {
  getDetails,
  deleteAccount,
  setUsername,
} = require("../Controllers/AuthController");
require("dotenv").config();

router.post("/get-details", getDetails);
router.delete("/delete-account", deleteAccount);
router.put("/set-username", setUsername);

module.exports = router;
