require("dotenv").config();

const PORT = process.env.PORT || 8080;
const express = require("express");
const cors = require("cors");
const DbConnect = require("./Config/database");
const apiv1Router = require("./Routes/IndexRouter");

const app = express();

app.enable("trust proxy");
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
app.use("/api/v1", apiv1Router);
