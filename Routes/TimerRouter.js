const express = require("express");
const router = express.Router();
const { saveCompletedTimer } = require("../Controllers/TimerController");

router.post("/save-completed-timer", saveCompletedTimer);

module.exports = router;
