const express = require("express");

const router = express.Router();
const AuthRouter = require("./AuthRouter");
const TodoRouter = require("./TodoRouter");

router.use("/auth", AuthRouter);
router.use("/todo", TodoRouter);

module.exports = router;
