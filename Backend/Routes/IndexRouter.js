const express = require("express");

const router = express.Router();
const AuthRouter = require("./AuthRouter");
const TodoRouter = require("./TodoRouter");
const TimerRouter = require("./TimerRouter");
const NotesRouter = require("./NotesRouter");
const ProductivityDataRouter = require("./ProductivityDataRouter");
const FriendRouter = require("./FriendsRouter");
const StudyRoomRouter = require("./StudyRoomRouter");

router.use("/auth", AuthRouter);
router.use("/todo", TodoRouter);
router.use("/timer", TimerRouter);
router.use("/notes", NotesRouter);
router.use("/friends", FriendRouter);
router.use("/productivity", ProductivityDataRouter);
router.use("/study-room", StudyRoomRouter);

module.exports = router;
