const express = require('express');
const router = express.Router();

// 🎟 POST /api/invites — генерация инвайта
router.post('/', async (req, res) => {
  const { type, price, expires_at } = req.body;

  if (!type || !price || !expires_at) {
    return res.status(400).json({ error: '❌ Не указаны все обязательные поля: type, price, expires_at' });
  }

  // Генерация уникального кода (8 символов)
  const code = Math.random().toString(36).substring(2, 10).toUpperCase();

  try {
    const pool = req.pool;

    await pool.query(
      `INSERT INTO invites (code, type, price, expires_at, used, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())`,
      [code, type, price, expires_at, false]
    );

    res.status(201).json({ message: '✅ Инвайт создан', code });
  } catch (error) {
    console.error('❌ Ошибка при создании инвайта:', error);
    res.status(500).json({ error: 'Ошибка сервера', detail: error.message }); // <-- можешь временно оставить для дебага
  }
});

module.exports = router;
