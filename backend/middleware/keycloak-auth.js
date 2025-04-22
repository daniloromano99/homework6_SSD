function checkRole(requiredRoles) {
  return function (req, res, next) {
    if (!req.kauth || !req.kauth.grant) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const tokenContent = req.kauth.grant.access_token.content;
    const userRoles = tokenContent.realm_access ? tokenContent.realm_access.roles : [];
    const rolesToCheck = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
    const hasRole = rolesToCheck.some(role => userRoles.includes(role));
    if (!hasRole) {
      return res.status(403).json({ error: 'Forbidden: insufficient role' });
    }
    next();
  };
}

module.exports = { checkRole };
