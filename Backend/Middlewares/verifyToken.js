require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.CLIENT_SECRET;
const clientId = process.env.CLIENT_ID;
const { OAuth2Client } = require("google-auth-library");

const oAuth2Client = new OAuth2Client(clientId, secret);

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { user } = req.body;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: No token provided" });
    }
    const ticket = await oAuth2Client.verifyIdToken({
      idToken: token,
      audience: clientId,
    });
    const payload = ticket.getPayload();
    if (payload) {
      if (user) {
        if (user.email != payload.email) {
          res
            .status(403)
            .json({
              success: false,
              message: "Token email and request's email did not match",
            });
        }
      }
      console.log(payload);
      next();
      return;
    }
  } catch {
    return res
      .status(403)
      .json({ success: false, message: "Unauthorized: Invalid token" });
  }
};

module.exports = verifyToken;
