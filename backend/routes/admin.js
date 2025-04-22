const express = require('express');
const { checkJwt, checkRole } = require('../middleware/auth');
const router = express.Router();

// Apply middleware to check authentication and role
router.use(checkJwt);
router.use(checkRole('admin')); // Assuming 'admin' is the required role

router.get('/', (req, res) => {
  res.json({ message: 'risorse admin' });
});

module.exports = router;
