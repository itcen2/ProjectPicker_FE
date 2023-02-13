import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import AppRouter from './router/AppRouter';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
);
reportWebVitals();
