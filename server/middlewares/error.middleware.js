const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  const stack = err.stack;

  return res.status(statusCode).json({
    success: false,
    message,
    stack,
  });
};

export default errorMiddleware;
