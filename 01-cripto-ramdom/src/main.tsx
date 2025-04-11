import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
/// importar para el cliente de react-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
/// importar para las devtools
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

/// Crear cliente
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        {/*/// Proveedor de cliente */}
        <QueryClientProvider client={queryClient} >
            <App />
            {/*/// Devtools */}
            <ReactQueryDevtools/>
        </QueryClientProvider>
    </StrictMode>
);
