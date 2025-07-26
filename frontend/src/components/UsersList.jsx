// src/components/UsersList.jsx
import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/api/users')
      .then(res => setUsers(res.data))
      .catch(console.error);
  }, []);

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.username}</li>
      ))}
    </ul>
  );
}
