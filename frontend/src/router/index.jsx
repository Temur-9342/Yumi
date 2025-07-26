import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../App';
import AppRouter from './router/AppRouter'; // НЕ ./router (это index.jsx)
import { BrowserRouter } from 'react-router-dom';

import './styles/access-gate.css';
import './styles/globals.css';
import './styles/variables.css';
import './styles/darkmode.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
