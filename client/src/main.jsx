import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

/**
 * Frontend Application Entry Point
 * Mounts the React application with React Router DOM provider
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/library-management">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
