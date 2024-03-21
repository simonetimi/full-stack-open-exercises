import ReactDOM from 'react-dom/client';
import App from './App';
import NotificationProvider from './NotificationContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserProvider } from './hooks/UserContext';
import { NextUIProvider } from '@nextui-org/react';
import './style.css';

const queryClient = new QueryClient();

import './style.css';
ReactDOM.createRoot(document.getElementById('root')).render(
  <NextUIProvider>
    <UserProvider>
      <NotificationProvider>
        <QueryClientProvider client={queryClient}>
          <main className="p-4 flex flex-col items-center">
            <App />
          </main>
        </QueryClientProvider>
      </NotificationProvider>
    </UserProvider>
  </NextUIProvider>,
);
