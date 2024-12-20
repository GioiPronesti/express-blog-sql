function notFound(req, res, next) {
  res.status(404);
  res.json({
    error: "Not found",
    message: "Resource not found",
  });
}

module.exports = notFound;
