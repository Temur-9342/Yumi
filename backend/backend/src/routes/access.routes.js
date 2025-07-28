const express = require('express');
const router = express.Router();

// Временный маршрут
router.get('/', (req, res) => {
  res.send('🔑 Access route работает!');
});

module.exports = router;
