const logger = (req, res, next) => {
    const date = new Date().toISOString();
    const method = req.method;
    const url = req.url;
  
    console.log(`[${date}] ${method} ${url}`);
  
    next();
};
  
module.exports = logger;