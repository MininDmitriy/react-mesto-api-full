const JWT = require('jsonwebtoken');
const { message } = require('../helpers/constants');
const UnauthorizedError = require('../errors/UnauthorizedError');

require('dotenv').config();
const { NODE_ENV, JWT_SECRET } = process.env;

let privateKey;
if(NODE_ENV === 'production') {
  privateKey = JWT_SECRET;
} else {
  privateKey = 'dev-secret';
}

const checkAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(message.errorIncorrectDate.authorization));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = JWT.verify(token, privateKey);
  } catch (err) {
    return next(new UnauthorizedError(message.errorIncorrectDate.token));
  }

  req.user = payload;
  return next();
};

module.exports = { checkAuth };
