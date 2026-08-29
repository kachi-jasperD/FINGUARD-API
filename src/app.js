require("dotenv").config();

const express = require("express");
const cors = require("cors");
const RequestLogger = require("./middlewares/logger.js");
const errorHandler = require("./middlewares/errorHandler.js");
const userRoute = require("./routes/userRoute.js");
const debtRoute = require("./routes/debtRoute.js");
const financialProfileRoute = require("./routes/FinancialProfileRoute.js");
const analysisRoute = require("./routes/analysisRoute");
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


app.use("/api/users", userRoute);
app.use("/api/debts", debtRoute);
app.use("/api/financial-profiles", financialProfileRoute);
app.use("/api/analyses", analysisRoute);

//------------------------------------
// LAST MIDDLEWARE
//------------------------------------

app.use(errorHandler);

module.exports = app;
