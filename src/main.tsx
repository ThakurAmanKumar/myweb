
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add favicon link
const link = document.createElement('link');
link.rel = 'icon';
link.href = '/favicon.ico';
document.head.appendChild(link);

createRoot(document.getElementById("root")!).render(<App />);
