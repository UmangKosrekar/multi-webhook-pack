const { request, response } = require("express");

// --------------------------------------------------------------------------------------------------------------------
/**
 * @param {request} req
 * @param {response} res
 * @param {number} statusCode
 * @param {string=} message
 * @param {Object=} data
 * @param {string=} errorCode
 */
const responseHandler = (req, res, statusCode, message, data, errorCode) => {
  return res.status(statusCode).json({ status: statusCode > 299 ? false : true, message, data, errorCode });
};

// --------------------------------------------------------------------------------------------------------------------
/**
 * @typedef {Object} Err
 * @property {string} message
 * @property {string} errorCode
 * @property {number} statusCode
 *
 * @param {request} req
 * @param {response} res
 * @param {Err} err
 */

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return responseHandler(req, res, statusCode, message, null, err.errorCode);
};
// --------------------------------------------------------------------------------------------------------------------

module.exports = {
  responseHandler,
  errorHandler
};
