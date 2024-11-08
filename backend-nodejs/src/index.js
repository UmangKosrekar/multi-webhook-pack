require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const express = require("express");
const cors = require("cors");
const { socketServer } = require("./socket");

/**
 * Example of multi-webhook
const Webhook = require("multi-webhook");
new Webhook().start(1000);
 */

const app = express();
const PORT = process.env.LOCAL_PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require("morgan")("dev"));
app.use(cors());

app.use(require("./router"));
app.use(require("./helper/handles").errorHandler);

const server = app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
socketServer(server);
