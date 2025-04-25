import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

const PostLoginRedirect = () => {
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();

  useEffect(() => {
    if (keycloak.authenticated) {
      const realmRoles = keycloak.tokenParsed?.realm_access?.roles || [];
      const clientRoles = keycloak.tokenParsed?.resource_access?.myclient?.roles || [];
      const userRoles = [...realmRoles, ...clientRoles];

      console.log('✅ Logged in as:', keycloak.tokenParsed?.preferred_username);
      console.log('🔐 Roles:', userRoles);

      if (userRoles.includes('admin')) {
        setTimeout(() => navigate('/admin'), 0);
      } else if (userRoles.includes('user')) {
        setTimeout(() => navigate('/user'), 0);
      } 
    } else {
      keycloak.login({ redirectUri: window.location.origin });
    }
  }, [keycloak, navigate]);

  return <div>Redirecting...</div>;
};

export default PostLoginRedirect;
