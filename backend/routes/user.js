const express = require('express');
const { checkJwt, checkRole } = require('../middleware/auth');
const router = express.Router();

// Apply middleware to check authentication and role
router.use(checkJwt);
router.use(checkRole('user')); // Assuming 'user' is the required role

router.get('/', (req, res) => {
  res.json({ message: 'risorse utente' });
});

module.exports = router;
