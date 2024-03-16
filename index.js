require("dotenv").config();
const express = require("express");
const cors = require("cors");
const DbConnect = require("./Config/database");
const apiv1Router = require("./Routes/IndexRouter");
const app = express();
const PORT = process.env.PORT || 8080;
const audience = process.env.AUTH0_AUDIENCE;
const baseurl = process.env.AUTH_DOMAIN;
const algo = process.env.AUTH0_ALGO;
const { auth } = require("express-oauth2-jwt-bearer");

app.listen(PORT, () => {
  console.log("Server started successfully at Port", PORT);
});

app.get("/", (req, res) => {
  res.send("Server started running successfully!");
});

DbConnect();
app.use(cors());
app.use(express.json());

const jwtCheck = auth({
  audience: audience,
  issuerBaseURL: baseurl,
  tokenSigningAlg: algo,
});

app.use(jwtCheck);
app.use("/api/v1", apiv1Router);
