# Full-Stack React + Node.js Keycloak Web Application

## Overview

This project is a full-stack web application with React frontend and Node.js Express backend integrated with Keycloak for authentication using OpenID Connect. The frontend uses `react-keycloak`, the backend uses `keycloak-connect` middleware. Keycloak is deployed using Docker with HTTPS and self-signed certificates for local development.

The app supports role-based access control with two roles: `admin` and `user`. Admins can access both admin and user resources, while users can only access user resources.

Material-UI is used for UI components in the frontend. The backend validates tokens for API requests and protects routes accordingly.

---

## Project Structure

```
tentativo/
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── keycloak-config.js
│   ├── routes/
│   │   ├── admin.js
│   │   └── user.js
│   └── middleware/
│       └── keycloak-auth.js
├── frontend/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── index.js
│       ├── App.js
│       ├── keycloak.js
│       ├── components/
│       │   ├── AdminResources.js
│       │   ├── UserResources.js
│       │   └── ProtectedRoute.js
│       └── theme.js
├── keycloak/
│   ├── docker-compose.yml
│   ├── certs/
│   │   ├── keycloak.crt
│   │   └── keycloak.key
│   └── realm-export.json
├── README.md
```

---

## Setup and Execution Instructions

### 1. Generate Self-Signed Certificates for Keycloak HTTPS

Navigate to the `keycloak/certs/` directory (create it if it doesn't exist), then run the following commands to generate the self-signed certificates with Subject Alternative Name (SAN) for localhost:

```bash
openssl genrsa -out keycloak.key 2048;
openssl req -new -key keycloak.key -out keycloak.csr -config openssl.cnf;
openssl x509 -req -in keycloak.csr -signkey keycloak.key -out keycloak.crt -extensions req_ext -extfile openssl.cnf -days 365
```

This will generate `keycloak.key` and `keycloak.crt` files with SAN for localhost needed for HTTPS.

### 2. Generate Java Keystore (JKS) for Keycloak HTTPS

Keycloak requires a Java keystore (JKS) file for HTTPS. Run the following script from the `keycloak/` directory to generate the keystore:

```bash
cd keycloak
chmod +x generate-keystore.sh
./generate-keystore.sh
cd ..
```

This script converts the PEM certificate and key into a JKS keystore file `certs/tls.jks` with password `changeit`.

### 3. Start Keycloak Server with Docker

From the root project directory, run:

```bash
docker-compose -f keycloak/docker-compose.yml up -d
```

This will start Keycloak on `https://localhost:8443` with the realm and client configured.

### 4. (Optional) Automatically Trust Self-Signed Certificate on Windows

To avoid browser warnings about the self-signed certificate, you can run the provided PowerShell script to install the certificate into the Windows Trusted Root Certification Authorities store.

Run the following commands in an elevated PowerShell prompt:

```powershell(amministratore)
cd keycloak
.\install-cert.ps1
cd..
 keytool -importcert -file keycloak/certs/keycloak.crt -alias keycloak -keystore keycloak/certs/tls.jks -storepass changeit -noprompt

```

You may need to restart your browser after running the script for the changes to take effect.

If you are on a different OS, you will need to manually add the certificate to your system's trusted certificates.



### 3. Backend Setup

Navigate to the `backend/` directory:

```bash
cd backend;
npm install;
npm start
```

The backend server will start on port 4000.

### 4. Frontend Setup

Navigate to the `frontend/` directory:

```bash
cd frontend;
npm install;
npm start
```

The React app will start on `http://localhost:3000`.

---

## Usage

- Access the frontend at `http://localhost:3000`.
- You will be redirected to Keycloak login.
- After login:
  - If you have the `admin` role, you can access `/admin` and `/user` routes.
  - If you have the `user` role, you can access only `/user` route.
- Use the logout button in the app bar to log out.

---

## Notes

- The Keycloak admin console is accessible at `https://localhost:8443/admin` with username `admin` and password `admin`.
- You can manage users, roles, and clients from the Keycloak admin console.
- The realm and client configuration is imported automatically from `keycloak/realm-export.json`.

---

This completes the setup and execution process for the full-stack Keycloak integrated web application.
