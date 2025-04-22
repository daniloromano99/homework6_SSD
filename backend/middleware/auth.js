const { auth } = require('express-oauth2-jwt-bearer');

// Middleware per verificare se l'utente è autenticato e ha il ruolo richiesto
const checkJwt = auth({
  audience: 'myclient', // Aggiorna questo con il valore corretto dell'audience
  issuer: `https://localhost:8443/auth/realms/myrealm`, // Aggiorna questo con l'URL corretto dell'issuer (emittente)
  jwksUri: `https://localhost:8443/auth/realms/myrealm/protocol/openid-connect/certs`, // JWKS URI
});

// Middleware per verificare i ruoli dell'utente
const checkRole = (role) => {
  return (req, res, next) => {
    const userRoles = req.user['resource_access']['myclient'].roles; // Modifica in base alla tua configurazione di Keycloak
    if (userRoles.includes(role)) {
      next();
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  };
};

module.exports = { checkJwt, checkRole };