const { sign } = require("./helper/common");
const { socketEventEnum } = require("./helper/constants");
const socketMiddleware = require("./middleware/socketAuth");
let ioInstance;

const channel = (io) => {
  io.use((socket, next) => socketMiddleware(socket, next));

  io.on(socketEventEnum.receive.CONNECTION, (socket) => {
    console.trace(socket.decoded);

    io.to(socket.id).emit(
      socketEventEnum.emit.TOKEN,
      (() => {
        const token = sign({ ...socket.decoded, socketId: socket.id });
        return { token };
      })()
    );
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
