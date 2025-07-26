const db = require('../db')
const bcrypt = require('bcrypt')

// Создание нового пользователя
async function createUser(username, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10)
  const query = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, username, email
  `
  const values = [username, email, hashedPassword]
  const result = await db.query(query, values)
  return result.rows[0]
}

// Поиск пользователя по email
async function findUserByEmail(email) {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email])
  return result.rows[0]
}

// Валидация пароля
async function validatePassword(user, inputPassword) {
  return bcrypt.compare(inputPassword, user.password)
}

module.exports = {
  createUser,
  findUserByEmail,
  validatePassword
}
