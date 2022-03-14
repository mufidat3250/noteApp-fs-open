const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const noteRouter = require("./controller/notes");
const middleware = require("./utils/middleware");

try {
  mongoose
    .connect(config.MONGODB_URI)
    .then(() => logger.info("connected to DB"));
} catch (error) {
  logger.error("error connecting to mongoDB", error.message);
}

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/notes", noteRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorhandler);

module.exports = app;
