import ReactDOM from 'react-dom/client';
import App from './App';
import NotificationProvider from './NotificationContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserProvider } from './hooks/UserContext';

const queryClient = new QueryClient();

import './style.css';
ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <NotificationProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </NotificationProvider>
  </UserProvider>,
);
