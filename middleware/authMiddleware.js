const jwt = require('jsonwebtoken');

function verifyTokenAndAccessLevel(requiredAccessLevel) {
  return (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(403).send('Token is required');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (
        decoded.accessLevel === requiredAccessLevel ||
        decoded.accessLevel === 'admin'
      ) {
        req.user = decoded; // Attach user info to the request object
        next();
      } else {
        return res.status(403).send('You do not have the necessary permissions');
      }
    } catch (error) {
      return res.status(401).send('Invalid token');
    }
  };
}

module.exports = verifyTokenAndAccessLevel;
