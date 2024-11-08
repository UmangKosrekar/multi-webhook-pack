exports.ErrorCodesEnum = Object.freeze({
  VALIDATION_ERROR: "VALIDATION_ERROR",
  TOKEN_MISSING: "TOKEN_MISSING",
  USER_NOT_FOUND: "USER_NOT_FOUND"
});

exports.socketEventEnum = Object.freeze({
  emit: {
    BROADCAST: "broadcast",
    HOOK: "hook",
    TOKEN: "token"
  },
  receive: {
    SEND_MSG: "send_msg",
    CONNECTION: "connection",
    ERROR: "error",
    FAILED: "connect_failed",
    DISCONNECT: "disconnect"
  }
});
