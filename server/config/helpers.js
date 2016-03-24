const jwt = require('jwt-simple');

module.exports = {
  errorHandler: (err, req, res, next) => {
    console.error(err.stack);
    // send error message to client
    // message for graceful error handling on app
    res.status(500).send({ error: err.message });
  },

  decode: (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
      return res.send(403); // send forbidden if a token is not provided
    }

    try {
      // decode token and attach user to the request
      // for use inside our controllers
      const user = jwt.decode(token, 'secret');
      req.user = user;
      next();
    } catch (error) {
      return next(error);
    }
  },
};
