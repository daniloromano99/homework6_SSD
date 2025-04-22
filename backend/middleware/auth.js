const { auth } = require('express-oauth2-jwt-bearer');

// Middleware to check if the user is authenticated and has the required role
const checkJwt = auth({
  audience: 'myclient', // Update this to the correct audience
  issuer: `https://localhost:8443/auth/realms/myrealm`, // Update this to the correct issuer URL
  jwksUri: `https://localhost:8443/auth/realms/myrealm/protocol/openid-connect/certs`, // JWKS URI
});

// Middleware to check user roles
const checkRole = (role) => {
  return (req, res, next) => {
    const userRoles = req.user['resource_access']['myclient'].roles; // Adjust based on your Keycloak setup
    if (userRoles.includes(role)) {
      next();
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  };
};

module.exports = { checkJwt, checkRole };