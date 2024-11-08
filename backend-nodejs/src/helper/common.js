const jwt = require("jsonwebtoken");

exports.sign = (data) => {
  return jwt.sign(data, process.env.JWT_TOKEN);
};
