const jwt = require("jsonwebtoken");
const CONF = require("../../config/config");

verifyToken = (req, res, next) => {
  const authHeader = req.headers["x-access-token"];
  // const token = authHeader && authHeader.split(" ")[1];
  const token = authHeader;
  if (token == null)
    return res.status(401).json({
      responCode: 401,
      Msg: "Unauthorized",
    });
  jwt.verify(token, CONF.ENV.SECRET.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({
        responCode: 403,
        Msg: "No token provided! ",
      });
    req.user = user;
    next();
  });
};

const authJwt = {
  verifyToken: verifyToken,
};

module.exports = authJwt;
