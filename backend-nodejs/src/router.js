const { Router } = require("express");
const app = Router();
const authMiddleware = require("./middleware/auth");

const { webhook, makeAuthenticationToken, listWebhook, viewHook } = require("./controller");

app.get("/generate-token", makeAuthenticationToken);
app.get("/list", authMiddleware, listWebhook);
app.put("/view/:id", authMiddleware, viewHook);

// webhook
app.use(["/:uuid/*", "/:uuid"], webhook);

module.exports = app;
