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
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60vh',
        color: '#b00020',
        fontSize: '2.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#ffe6e6',
        borderRadius: '10px',
        margin: '40px',
        boxShadow: '0 4px 8px rgba(176, 0, 32, 0.3)'
      }}>
        Accesso Negato
        <p style={{
          fontSize: '1.25rem',
          fontWeight: 'normal',
          marginTop: '15px',
          color: '#660014'
        }}>
          Non hai i permessi per accedere a questa pagina.
        </p>
      </div>
    );
  }

  // Altrimenti, mostra i contenuti protetti
  return children;
};

export default ProtectedRoute;
