const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Access Denied, Provide Valid Token" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // verify that user still exist in the DB
    const user = await UserModel.findById(payload.userId);

    // if user has been deactivated
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // req.user = payload;
    req.user = {
      id: user._id,
      email: user.email,
    };
    next();
  } catch (error) {
    res.status(401).json({
      error: "Invalid or expired token",
    });
  }
};

module.exports = requireAuth;
