import React from 'react';
import { useKeycloak } from '@react-keycloak/web';

const ProtectedRoute = ({ children, roles }) => {
  const { keycloak, initialized } = useKeycloak();

  // Se Keycloak non è ancora inizializzato -> mostra un messaggio di caricamento 
  if (!initialized) {
    return <div>Loading...</div>;
  }

  // Se l'utente non è autenticato -> forza il redirect alla pagina di login di Keycloak
  if (!keycloak.authenticated) {
    keycloak.login();
    return <div>Redirecting to login...</div>;
  }

  // Estrae i ruoli dal token JWT: sia dal realm sia dal client "myclient"
  const realmRoles = keycloak.tokenParsed?.realm_access?.roles || [];
  const clientRoles = keycloak.tokenParsed?.resource_access?.myclient?.roles || [];
  const userRoles = [...realmRoles, ...clientRoles];

  // Verifica se l’utente ha almeno uno dei ruoli richiesti
  const hasRequiredRole = roles.some(role => userRoles.includes(role));

  // Se l’utente non ha i ruoli giusti -> accesso negato
  if (!hasRequiredRole) {
    return <div>Access Denied</div>;
  }

  // Altrimenti, mostra i contenuti protetti
  return children;
};

export default ProtectedRoute;
