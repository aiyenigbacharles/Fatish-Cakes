import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { applyTheme, getInitialTheme } from './lib/theme.ts';

// Initialize light/dark mode preference immediately
applyTheme(getInitialTheme());

createRoot(document.getElementById('root')!).render(<App />);
