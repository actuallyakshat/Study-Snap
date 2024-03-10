const express = require("express");

const router = express.Router();
const AuthRouter = require("./AuthRouter");
const TodoRouter = require("./TodoRouter");
const TimerRouter = require("./TimerRouter");

router.use("/auth", AuthRouter);
router.use("/todo", TodoRouter);
router.use("/timer", TimerRouter);

module.exports = router;
