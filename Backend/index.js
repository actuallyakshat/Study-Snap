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
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     cookie: { maxAge: 15 * 24 * 60 * 60 * 1000 },
//     saveUninitialized: true,
//   })
// );

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, //we dont want to save a session if nothing is modified
    saveUninitialized: false, //dont create a session until something is stored
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      secure: true, //Enable when deployment OR when not using localhost, this wont work without https
      sameSite: "none", //Enable when deployment OR when not using localhost, We're not on the same site, we're using different site so the cookie need to effectively transfer from Backend to Frontend
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/api/v1", apiv1Router);
