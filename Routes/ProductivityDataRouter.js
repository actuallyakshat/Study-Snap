const express = require("express");
const router = express.Router();
const {
  addProductivityData,
  setStudyTarget,
} = require("../Controllers/ProductivityDataController");

router.post("/add-data", addProductivityData);
router.put("/set-target", setStudyTarget);

module.exports = router;
