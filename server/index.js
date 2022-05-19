require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { notFoundError, errorDefault } = require("./middlewares/errors");
const platformsRouter = require("./routers/platformRouters");
const userRouter = require("./routers/userRouter");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/platforms", platformsRouter);
app.use("/users", userRouter);

app.use(notFoundError);
app.use(errorDefault);

module.exports = app;
