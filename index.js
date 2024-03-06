require("dotenv").config();
const express = require("express");
const cors = require("cors");
const DbConnect = require("./Config/database");
const apiv1Router = require("./Routes/IndexRouter");
const app = express();
const PORT = process.env.PORT || 8080;
const { auth } = require("express-oauth2-jwt-bearer");

app.listen(PORT, () => {
  console.log("Server started successfully at Port", PORT);
});

DbConnect();
app.use(cors());
app.use(express.json());

const jwtCheck = auth({
  audience: "https://studysnapbackend.com/auth0-api",
  issuerBaseURL: "https://dev-va3ob1dac8fm3vni.us.auth0.com/",
  tokenSigningAlg: "RS256",
});
app.use("/api/v1", apiv1Router);
app.use(jwtCheck); //applied protection on every route
