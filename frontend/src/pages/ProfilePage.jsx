// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import api from '../utils/api';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/register', {
        username,
        email,
        password,
      });
      alert('Регистрация прошла успешно!');
    } catch (err) {
      alert('Ошибка при регистрации: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <h1>Регистрация</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
}
