import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'https://localhost:8443/',
  realm: 'myrealm',
  clientId: 'myclient',
});

export default keycloak;
