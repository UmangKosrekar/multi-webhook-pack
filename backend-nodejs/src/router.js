const { Router } = require("express");
const app = Router();

const { webhook, makeAuthenticationToken, listWebhook } = require("./controller");

app.get("/generate-token", makeAuthenticationToken);
app.get("/list", listWebhook);

// webhook
app.use(["/:uuid/*", "/:uuid"], webhook);

module.exports = app;
