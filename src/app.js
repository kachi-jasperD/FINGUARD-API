require("dotenv").config();

const express = require("express");
const cors = require("cors");
const RequestLogger = require("./middlewares/logger.js");
const errorHandler = require("./middlewares/errorHandler.js");
const router = require("./routes/routes.js");
const app = express();
const port = process.env.PORT || 3000;

//------------------------------------
// MIDDLEWARE
//------------------------------------
app.use(express.json());
app.use(cors());
app.use(RequestLogger);

//------------------------------------
// ROUTES
//------------------------------------


app.use("/api", router);

//------------------------------------
// LAST MIDDLEWARE
//------------------------------------

app.use(errorHandler);

module.exports = app;
