const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(error);
    console.error("DB Connection Failed");
    process.exit(1);
  }
};

module.exports = connectDB;
