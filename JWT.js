require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

const createToken = (user) => {
  const accessToken = sign(
    {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];

  if (!accessToken) {
    return res.status(400).json({ message: "User not authenticated" });
  }

  try {
    const validToken = verify(accessToken, proccess.env.JWT_SECRET);
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = { createToken, validateToken };
