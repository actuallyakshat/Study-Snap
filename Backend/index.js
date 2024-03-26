require("dotenv").config();

const PORT = process.env.PORT || 8080;
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const DbConnect = require("./Config/database");
const googleAuth = require("./Passport/GoogleAuth");
const apiv1Router = require("./Routes/IndexRouter");

const app = express();

app.enable('trust proxy')
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.listen(PORT, () => {
  console.log("Server started successfully at Port", PORT);
});

app.get("/", (req, res) => {
  res.send("Server started running successfully!");
});

DbConnect();
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    cookie: {
      secure: true,
      httpOnly: false,
      sameSite: "none",
      maxAge: 15 * 24 * 60 * 60 * 1000,
    },
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/api/v1", apiv1Router);
