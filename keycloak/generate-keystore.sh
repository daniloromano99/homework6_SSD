#!/bin/bash

# Genera il PKCS12 keystore 
openssl pkcs12 -export \
  -in certs/keycloak.crt \
  -inkey certs/keycloak.key \
  -out certs/tls.p12 \
  -name tls \
  -password pass:changeit

# Converte il PKCS12 keystore in JKS
keytool -importkeystore \
  -deststorepass changeit \
  -destkeypass changeit \
  -destkeystore certs/tls.jks \
  -srckeystore certs/tls.p12 \
  -srcstoretype PKCS12 \
  -srcstorepass changeit \
  -alias tls
