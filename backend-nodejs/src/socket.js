const { socketEventEnum } = require("./helper/constants");
const socketMiddleware = require("./middleware/socketAuth");
let ioInstance;

const channel = (io) => {
  io.use((socket, next) => socketMiddleware(socket, next));

  io.on(socketEventEnum.receive.CONNECTION, (socket) => {
    socket.join(socket.decoded.userUUID);

    socket.to(socket.decoded.userUUID).emit(socketEventEnum.emit.BROADCAST, "new connection");
  });

  // error handling
  io.on(socketEventEnum.receive.ERROR, (socket) => {
    console.error("Socket error:", error.message);
    socket.emit(socketEventEnum.receive.ERROR, { msg: error.message, code: error.code });
  });
};

const socketServer = (server) => {
  try {
    ioInstance = require("socket.io")(server, {
      cors: {
        origin: "*"
      }
    });

    channel(ioInstance);
  } catch (error) {
    console.log("socket, error\n", error);
  }
};

module.exports = { socketServer, getIo: () => ioInstance };
