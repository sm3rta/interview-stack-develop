import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const rootHTML = document.getElementById('root');
if (rootHTML) {
    const root = createRoot(rootHTML);
    root.render(<App />);
}
