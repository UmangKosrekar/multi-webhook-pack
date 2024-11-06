const { Router } = require("express");
const app = Router();

const { webhook, makeAuthenticationToken, listWebhook, viewHook } = require("./controller");

app.get("/generate-token", makeAuthenticationToken);
app.get("/list", listWebhook);
app.put("/view/:id", viewHook);

// webhook
app.use(["/:uuid/*", "/:uuid"], webhook);

module.exports = app;
