const express = require('express');
const { checkJwt, checkRole } = require('../middleware/auth');
const router = express.Router();

// Applica il middleware per verificare l'autenticazione e il ruolo
router.use(checkJwt);
router.use(checkRole('user')); // Supponendo che "user" sia il ruolo richiesto
router.get('/', (req, res) => {
  res.json({ message: 'risorse utente' });
});

module.exports = router;
