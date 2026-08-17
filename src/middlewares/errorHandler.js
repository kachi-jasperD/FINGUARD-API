const multer = require("multer");

const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  console.error(err.stack || "No stack trace available");
  const status = err.status || 500;

   if (res.headersSent) {
     return next(err);
   }
   
  if (err instanceof multer.MulterError) {
    // A Multer error occurred when uploading.
    res
      .status(400)
      .json({ error: err.message || "Invalid file type or too large File" });
  } else if (err) {
    // An unknown error occurred when uploading.
    res.status(status).json({ error: err.message || "Internal Server Error" });
  }

  res.status(status).json({ error: err.message || "Internal Server Error" });
};

module.exports = errorHandler;
