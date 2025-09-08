import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

console.log('Main.tsx loaded');

const rootElement = document.getElementById('root');
if (rootElement) {
  console.log('Root element found');
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
} else {
  console.error('Root element not found');
}
