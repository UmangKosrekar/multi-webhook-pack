require("dotenv").config({ path: require("path").join(__dirname, "../../") });
const { verify, sign } = require("jsonwebtoken");
const { ErrorCodesEnum, socketEventEnum } = require("../helper/constants");
const { CustomError } = require("../helper/customClass");
const jwtToken = process.env.JWT_TOKEN;

const middleware = (socket, next) => {
  try {
    const authorization = socket.handshake.headers?.authorization || socket.handshake.query?.authorization;
    if (authorization) {
      // decoding and verify data

      try {
        socket.decoded = verify(authorization, jwtToken);
        const getToken = sign({ ...socket.decoded, socketId: socket.id }, jwtToken);

        console.trace(socket.id);

        socket.emit(socketEventEnum.emit.TOKEN, { token: getToken }, (data) => {
          console.trace(data);
        });
      } catch (error) {
        throw new CustomError("User not found", ErrorCodesEnum.USER_NOT_FOUND, 400);
      }

      return next();
    } else {
      throw new CustomError("Token not found");
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = middleware;
