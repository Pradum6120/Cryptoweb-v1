const jwt = require("jsonwebtoken");
const ensureAuthenticated = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res
      .status(403)
      .json({ message: "Unauthorized, jwt token is required", success: false });
  }

  try {
    const decode = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Jwt token is wrong or expired",
      success: false,
    });
  }
}

module.exports = ensureAuthenticated
 