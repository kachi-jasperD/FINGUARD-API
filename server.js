require("dotenv").config();

require("./src/config/envValidation");
const app = require("./src/app.js");
const port = process.env.PORT || 3000;

//------------------------------------
// DATABASE CONNECTION
//------------------------------------
const connectDB = require("./src/config/connectDB.js");
connectDB();

//------------------------------------
// SERVER
//------------------------------------
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
