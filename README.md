# Applicazione Web Full-Stack React + Node.js con Keycloak

## Panoramica

Questo progetto è un'applicazione web full-stack con frontend React e backend Node.js Express integrati con Keycloak per l'autenticazione tramite OpenID Connect. Il frontend utilizza `react-keycloak`, il backend utilizza il middleware `keycloak-connect`. Keycloak è distribuito usando Docker con HTTPS e certificati autofirmati per lo sviluppo locale.

L'app supporta il controllo degli accessi basato sui ruoli con due ruoli: `admin` e `user`. Gli admin possono accedere sia alle risorse admin che a quelle user, mentre gli utenti possono accedere solo alle risorse user.

Material-UI è utilizzato per i componenti UI nel frontend. Il backend valida i token per le richieste API e protegge le rotte di conseguenza.



## Istruzioni per l'Installazione e l'Esecuzione

### 1. Generare Certificati Autofirmati per HTTPS di Keycloak

Navigare nella directory `keycloak/certs/` (crearla se non esiste), quindi eseguire i seguenti comandi per generare i certificati autofirmati con Subject Alternative Name (SAN) per localhost:

```bash
openssl genrsa -out keycloak.key 2048;
openssl req -new -key keycloak.key -out keycloak.csr -config openssl.cnf;
openssl x509 -req -in keycloak.csr -signkey keycloak.key -out keycloak.crt -extensions req_ext -extfile openssl.cnf -days 365
```

Questo genererà i file `keycloak.key` e `keycloak.crt` con SAN per localhost necessari per HTTPS.

### 2. Generare il Java Keystore (JKS) per HTTPS di Keycloak

Keycloak richiede un file Java keystore (JKS) per HTTPS. Eseguire lo script seguente dalla directory `keycloak/` per generare il keystore:

```bash
cd keycloak
chmod +x generate-keystore.sh
./generate-keystore.sh
cd ..
```

Questo script converte il certificato PEM e la chiave in un file keystore JKS `certs/tls.jks` con password `changeit`.

### 3. Avviare il Server Keycloak con Docker

Dalla directory principale del progetto, eseguire:

```bash
docker-compose -f keycloak/docker-compose.yml up -d
```

Questo avvierà Keycloak su `https://localhost:8443` con il realm e il client configurati.

### 4. Fidarsi Automaticamente del Certificato Autofirmato su Windows

Per evitare avvisi del browser riguardo al certificato autofirmato, è possibile eseguire lo script PowerShell fornito per installare il certificato nello store delle Autorità di Certificazione Radice attendibili di Windows.

Eseguire i seguenti comandi in una finestra PowerShell con privilegi elevati:

```powershell(amministratore)
cd keycloak
.\install-cert.ps1
cd..
 keytool -importcert -file keycloak/certs/keycloak.crt -alias keycloak -keystore keycloak/certs/tls.jks -storepass changeit -noprompt
```

Potrebbe essere necessario riavviare il browser dopo aver eseguito lo script affinché le modifiche abbiano effetto.

Se si utilizza un sistema operativo diverso, sarà necessario aggiungere manualmente il certificato ai certificati attendibili del sistema.

### 3. Configurazione Backend

Navigare nella directory `backend/`:

```bash
cd backend;
npm install;
npm start
```

Il server backend runnerà sulla porta 4000.

### 4. Configurazione Frontend

Navigare nella directory `frontend/`:

```bash
cd frontend;
npm install;
npm start
```

L'app React partirà su `http://localhost:3000`.

---

## Utilizzo

- Accedere al frontend su `http://localhost:3000`.
- Verrai reindirizzato al login di Keycloak.
- Dopo il login:
  - Se hai il ruolo `admin`, puoi accedere alle rotte `/admin` e `/user`.
  - Se hai il ruolo `user`, puoi accedere solo alla rotta `/user`.
- Usa il pulsante di logout nella barra dell'app per uscire.

---

## Note

- La console di amministrazione di Keycloak è accessibile su `https://localhost:8443/admin` con username `admin` e password `admin`.
- Puoi gestire utenti, ruoli e client dalla console di amministrazione di Keycloak.

---

Questa conclude il processo di installazione ed esecuzione per l'applicazione web full-stack integrata con Keycloak.
