import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/game.css';

console.log('🚀 Application starting...');
console.log('📦 React version:', React.version);

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('❌ Root element not found!');
} else {
  console.log('✅ Root element found, creating React root...');
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('✅ App rendered successfully!');
}