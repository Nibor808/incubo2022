import React from 'react';
import {createRoot} from 'react-dom/client';
import './styles/index.scss';
import './custom_bootstrap.js';
import {App} from './components/App';

const root = createRoot(document.getElementById('root') as Element);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
