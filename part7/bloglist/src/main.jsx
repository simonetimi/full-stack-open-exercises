import ReactDOM from 'react-dom/client';
import App from './App';
import NotificationProvider from './NotificationContext';

import './style.css';
ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationProvider>
    <App />
  </NotificationProvider>,
);
