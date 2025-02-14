const errorMid = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  const stack = process.env.NODE_ENV === "development" ? err.stack : {};
  return res.status(statusCode).send({ message, stack });
};

module.exports = { errorMid };
