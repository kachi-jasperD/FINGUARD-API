const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const envPath = path.resolve(process.cwd(), ".env");
dotenv.config({ path: envPath });

require("dotenv").config();

const requiredEnvVars = ["PORT", "MONGODB_URI", "JWT_SECRET"];

const missingVars = requiredEnvVars.filter(
  (key) => !process.env[key] || process.env[key].trim() === "",
);

if (missingVars.length > 0) {
  console.error(
    `❌ Missing required environment variable(s): ${missingVars.join(", ")}`,
  );
  process.exit(1);
}

module.exports = process.env;
