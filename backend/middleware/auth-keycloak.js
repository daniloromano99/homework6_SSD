const { auth } = require('express-oauth2-jwt-bearer');

// Middleware per verificare se l'utente è autenticato tramite JWT
const checkJwt = auth({
  audience: 'myclient', // Aggiorna questo con il valore corretto dell'audience
  issuer: `https://localhost:8443/auth/realms/myrealm`, // Aggiorna questo con l'URL corretto dell'issuer (emittente)
  jwksUri: `https://localhost:8443/auth/realms/myrealm/protocol/openid-connect/certs`, // JWKS URI
});

// Middleware per verificare i ruoli dell'utente basandosi sul token Keycloak
const checkRole = (requiredRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const tokenContent = req.user;
    const userRoles = tokenContent.realm_access ? tokenContent.realm_access.roles : [];
    const rolesToCheck = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
    const hasRole = rolesToCheck.some(role => userRoles.includes(role));
    if (!hasRole) {
      return res.status(403).json({ message: 'Access denied: insufficient role' });
    }
    next();
  };
};

module.exports = { checkJwt, checkRole };
