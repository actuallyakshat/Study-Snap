require("dotenv").config();
const express = require("express");
const cors = require("cors");
const DbConnect = require("./Config/database");
const apiv1Router = require("./Routes/IndexRouter");
const verifyToken = require("./Middlewares/verifyToken");
const app = express();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server started successfully at Port", PORT);
});

app.get("/", (req, res) => {
  res.send("Server started running successfully!");
});

DbConnect();
app.use(cors());
app.use(express.json());
app.use(verifyToken);
app.use("/api/v1", apiv1Router);
