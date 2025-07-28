// 📁 Загрузка переменных из .env
require('dotenv').config();

// 🚀 Импорт зависимостей
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

// 🛣️ Импорт роутов
const authRoutes = require('../routes/auth.routes.js');       // 🔐 Авторизация
const accessRoutes = require('../routes/access.routes.js');   // 🔑 Проверка кодов доступа
const invitesRoutes = require('../routes/invites.routes.js'); // 📩 Инвайты

// 🎛️ Создание приложения
const app = express();
const PORT = process.env.PORT || 3000;

// 🛠️ Настройка подключения к PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'yumi',
  password: process.env.DB_PASSWORD || 'Yumi434$143',
  port: process.env.DB_PORT || 5432,
});

// 🌐 Подключение Middleware
app.use(cors());             // Разрешает запросы с других доменов
app.use(express.json());     // Позволяет читать JSON из тела запроса

// 🔄 Прокидываем подключение к БД во все запросы
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

// 📡 Подключаем маршруты
app.use('/api', authRoutes);              // 👉 /api/register, /api/login
app.use('/api/access', accessRoutes);     // 👉 /api/access
app.use('/api/invites', invitesRoutes);   // 👉 /api/invites

// ✅ Проверка работы API
app.get('/', (req, res) => {
  res.send('✅ API работает!');
});

// 👤 Заглушка: список пользователей
app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, username: 'Alice' },
    { id: 2, username: 'Bob' },
  ]);
});

// 🚀 Запуск сервера
app.listen(PORT, () => {
  console.log(`🟢 Сервер запущен на http://localhost:${PORT}`);
});
