/* @refresh reload */
import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import { MyReactApp } from './App.react';

// Render React
const rootReact = document.getElementById('root-react');

if (import.meta.env.DEV && !(rootReact instanceof HTMLElement)) {
  throw new Error(
    'Root element for React not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?'
  );
}

ReactDOM.createRoot(rootReact!).render(<MyReactApp />);
