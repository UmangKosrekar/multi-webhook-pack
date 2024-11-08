const { verify } = require("jsonwebtoken");
const { CustomError } = require("../helper/customClass");
const { ErrorCodesEnum } = require("../helper/constants");

/**
 * @typedef {Object} Headers
 * @property {Token} token
 */

module.exports = (req, res, next) => {
  try {
    /** @type {Headers} */
    const { authorization } = req.headers;

    // decoding and verify data
    if (!authorization) {
      throw new CustomError("Token Missing", ErrorCodesEnum.TOKEN_MISSING, 400);
    }

    try {
      req.decoded = verify(authorization, process.env.JWT_TOKEN);
    } catch (error) {
      throw new CustomError("User not found", ErrorCodesEnum.USER_NOT_FOUND, 400);
    }
    next();
  } catch (error) {
    next(error);
    return;
  }
};
