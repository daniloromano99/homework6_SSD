#!/bin/bash

# Generate PKCS12 keystore from PEM certificate and key
openssl pkcs12 -export \
  -in certs/keycloak.crt \
  -inkey certs/keycloak.key \
  -out certs/tls.p12 \
  -name tls \
  -password pass:changeit

# Import PKCS12 keystore into JKS keystore
keytool -importkeystore \
  -deststorepass changeit \
  -destkeypass changeit \
  -destkeystore certs/tls.jks \
  -srckeystore certs/tls.p12 \
  -srcstoretype PKCS12 \
  -srcstorepass changeit \
  -alias tls
