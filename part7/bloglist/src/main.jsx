import ReactDOM from 'react-dom/client';
import App from './App';
import NotificationProvider from './NotificationContext';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

import './style.css';
ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </NotificationProvider>,
);
