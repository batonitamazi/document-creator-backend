const express = require("express");
const cors = require("cors");
const config = require("./utils/config");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const userRouter = require("./controllers/users");
const loginRouter = require('./controllers/users');

const app = express();

mongoose.set("strictQuery", config.MONGO_URI);

mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    logger.info("Connected to mongoDb");
  })
  .catch((error) => {
    logger.error("error connecting to mongoDb", error.message);
  });

app.use(express.json());
app.use(cors());
app.use(middleware.requestLogger);

app.use("/api/users/", userRouter);
app.use(middleware.unknownEndpoint);

module.exports = app;
