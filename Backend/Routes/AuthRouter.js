const express = require("express");
const router = express.Router();
const { getDetails, deleteAccount } = require("../Controllers/AuthController");
require("dotenv").config();

router.post("/getDetails", getDetails);
router.delete("/delete-account", deleteAccount);

module.exports = router;
