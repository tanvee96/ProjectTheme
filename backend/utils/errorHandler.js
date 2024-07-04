// utils/errorHandler.js
const handleServerError = (res, message = "Server Error", error = null) => {
    console.error(error);
    res.status(500).json({ message, error });
  };
  
  module.exports = { handleServerError };
  