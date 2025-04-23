const express = require('express');
const session = require('express-session');
const Keycloak = require('keycloak-connect');
const cors = require('cors');
const bodyParser = require('body-parser');
const keycloakConfig = require('./keycloak-config');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const { checkJwt, checkRole } = require('./middleware/auth-keycloak');

const app = express();
const memoryStore = new session.MemoryStore();

// Set Content Security Policy
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "frame-ancestors 'self' https://localhost:8443");
  next();
});

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());
app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
app.use(keycloak.middleware());

app.use('/admin', checkJwt, checkRole('admin'), adminRoutes);
app.use('/user', checkJwt, checkRole(['user', 'admin']), userRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Invalid token' });
  }
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
