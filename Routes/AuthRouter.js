const express = require("express");
const router = express.Router();
const { getDetails } = require("../Controllers/AuthController");
router.post("/getDetails", getDetails);

module.exports = router;
