const { sign } = require("./helper/common");
const { randomUUID } = require("node:crypto");
const { responseHandler } = require("./helper/handles");
const { getIo } = require("./socket");
const { socketEventEnum } = require("./helper/constants");
// const { ErrorCodesEnum } = require("./helper/constants");
// const { CustomError } = require("./helper/customClass");

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
 * @property {string=} socketId
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
    const io = getIo();
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

    io.to(req.user.socketId).emit(socketEventEnum.emit.HOOK, { msg: "Success" });

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

    const getToken = sign(_token);

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
    const { getNew } = req.query;

    const filteredData = webhookData.filter((x) => x.userUUID === req.decoded.userUUID && (getNew ? !x.viewed : true));

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
    const { id } = req.params;

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
