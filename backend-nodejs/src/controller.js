const { sign, verify } = require("jsonwebtoken");
const { randomUUID } = require("node:crypto");
const { responseHandler } = require("./helper/handles");
const { ErrorCodesEnum } = require("./helper/constants");
const { CustomError } = require("./helper/customClass");

// --------------------------------------------------------------------------------------------------------------------

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

/**
 * @typedef {Object} Token
 * @property {string} userUUID
 * @property {string} IP
 * @property {Date} createdAt
 */

/**
 * @typedef {Object} Headers
 * @property {Token} token
 */

/**
 * @typedef {Object} WebhookData
 * @property {import("node:crypto").UUID} id
 * @property {import("node:crypto").UUID} userUUID
 * @property {string} body
 * @property {string} baseURL
 * @property {Date} createAt
 * @property {boolean} viewed
 * @property {string} method
 * @property {Object} headers
 * @property {Number} size
 */

// --------------------------------------------------------------------------------------------------------------------

/** @type {WebhookData[]} */
const webhookData = [];

// --------------------------------------------------------------------------------------------------------------------

/**
@param {Request} req
@param {Response} res
@param {NextFunction} next
*/

exports.webhook = (req, res, next) => {
  try {
    webhookData.push({
      id: randomUUID(),
      baseURL: req.originalUrl.replace(`/${req.params.uuid}`, ""),
      body: req.body,
      createAt: new Date(),
      userUUID: req.params.uuid,
      viewed: false,
      method: req.method,
      headers: req.headers,
      size: Buffer.byteLength(String(req.body).trim())
    });

    return res.send(true);
  } catch (error) {
    next(error);
    return;
  }
};

// --------------------------------------------------------------------------------------------------------------------

/**
@param {Request} req
@param {Response} res
@param {NextFunction} next
*/
exports.makeAuthenticationToken = async (req, res, next) => {
  try {
    /**@type {Token}*/
    const _token = {
      IP: req.ip,
      createdAt: new Date(),
      userUUID: randomUUID()
    };

    const getToken = sign(_token, process.env.JWT_TOKEN);

    return responseHandler(req, res, 200, "Authentication Token created", {
      token: getToken,
      webhookLink: `${process.env.LIVE_URL}/${_token.userUUID}`
    });
  } catch (error) {
    next(error);
    return;
  }
};

// --------------------------------------------------------------------------------------------------------------------

/**
@param {Request} req
@param {Response} res
@param {NextFunction} next
*/
exports.listWebhook = async (req, res, next) => {
  try {
    /** @type {Headers} */
    const { authorization } = req.headers;
    const { getNew } = req.query;

    // decoding and verify data
    if (!authorization) {
      throw new CustomError("Token Missing", ErrorCodesEnum.TOKEN_MISSING, 400);
    }

    let decodedData;
    try {
      decodedData = verify(authorization, process.env.JWT_TOKEN);
    } catch (error) {
      throw new CustomError("User not found", ErrorCodesEnum.USER_NOT_FOUND, 400);
    }

    const filteredData = webhookData.filter((x) => x.userUUID === decodedData.userUUID && (getNew ? !x.viewed : true));

    return responseHandler(req, res, 200, undefined, filteredData);
  } catch (error) {
    next(error);
    return;
  }
};

// --------------------------------------------------------------------------------------------------------------------

/**
@param {Request} req
@param {Response} res
@param {NextFunction} next
*/
exports.viewHook = async (req, res, next) => {
  try {
    /** @type {Headers} */
    const { authorization } = req.headers;
    const { id } = req.params;

    // decoding and verify data
    if (!authorization) {
      throw new CustomError("Token Missing", ErrorCodesEnum.TOKEN_MISSING, 400);
    }

    let decodedData;
    try {
      decodedData = verify(authorization, process.env.JWT_TOKEN);
    } catch (error) {
      throw new CustomError("User not found", ErrorCodesEnum.USER_NOT_FOUND, 400);
    }

    webhookData.forEach((value) => {
      if (id === value.id) {
        value.viewed = true;
      }
    });

    return responseHandler(req, res, 200, undefined, filteredData);
  } catch (error) {
    next(error);
    return;
  }
};

// --------------------------------------------------------------------------------------------------------------------
