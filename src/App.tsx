import { Routes, Route } from 'react-router-dom';
import FlashcardsPage from './pages/FlashcardsPage';
import AdminPage from './pages/AdminPage';
import Header from './components/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FlashcardsProvider } from './context/flashcards/FlashcardsProvider';
import AuthProvider from './context/auth/AuthProvider';

const queryClient = new QueryClient();

/**
 * Root component of the application.
 * 
 * - Currently renders the Header and FlashcardsPage components.
 * - Can be expanded in the future to include navigation and routing.
 */
function App() {
    return (
        /**
         * Main entry point of the application.
         * 
         * If additional pages or features are added in the future (e.g., routing),
         * this file will serve as the top-level component.
         */
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <FlashcardsProvider>
                    <Header />
                    <Routes>
                        <Route path="/Accounting-Online-Flashcards" element={<FlashcardsPage />} />
                        <Route path="/Accounting-Online-Flashcards/admin" element={<AdminPage />} />
                    </Routes>
                </FlashcardsProvider>
            </AuthProvider>  
        </QueryClientProvider>      
    );
}

export default App;
