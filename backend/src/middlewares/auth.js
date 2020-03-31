const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader)
    return response.status(401).send({ error: 'No token provided' });

    const parts = authHeader.split(' ');

    if (!parts.length === 2)
      return response.status(401).send({ error: 'Token error' });

    const [ scheme, token ] = parts;

    if (!/^Bearer$/i.test(scheme)) 
      return response.status(401).send({ error: 'Token malformatted' });
    
    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (err) return response.status(401).send({ error: 'Invalid token' });
    
    request.userId = decoded.if;
    return next();
    });
};