const express = require('express');
const router = express.Router();

// Временный маршрут
router.get('/', (req, res) => {
  res.send('🔐 Auth route работает!');
});

module.exports = router;
