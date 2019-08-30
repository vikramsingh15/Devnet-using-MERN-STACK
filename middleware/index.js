const user = require('../models/user'),
  jwt = require('jsonwebtoken');

const middleware = {
  asyncErrorHandler(fn) {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  },
  auth(req, res, next) {
    const token = req.header('jwtToken');
    if (!token) {
      return res.status(401).json({ msg: 'No Token, auth denied !!' });
    }
    try {
      const decoded = jwt.verify(token, process.env.jwtSecret);
      req.user = decoded.user;
      next();
    } catch (error) {
      return res.status(401).json({ msg: 'Token not valid' });
    }
  }
};

module.exports = middleware;
