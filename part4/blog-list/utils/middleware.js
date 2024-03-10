const jwt = require('jsonwebtoken');

function extractToken(request, response, next) {
  const authorizationHeader = request.headers['authorization'];
  if (typeof authorizationHeader !== 'undefined') {
    const token = authorizationHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET);
    request.username = decodedToken.username;
    request.userId = decodedToken.id;
    next();
  } else {
    request.token = false;
    next();
  }
}

module.exports = { extractToken };
