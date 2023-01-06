import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import { ChatProvider } from "./container/hooks/useChat";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ChatProvider>
            <App />
        </ChatProvider>
    </React.StrictMode>
);
