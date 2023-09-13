const globalErrorHandler = (req, res, next) => {
    res.status(404).send(`Route '${req.originalUrl}' Not Found`);
    next();
};
  
module.exports = globalErrorHandler;