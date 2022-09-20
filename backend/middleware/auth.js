const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // get the token from headers
  const token = req.header("x-auth-token");
  // check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token,autherization denied" });
  }
  //verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtsecret"));
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "not autherized" });
  }
};
