import { Routes, Route } from 'react-router-dom';
import FlashcardsPage from './pages/FlashcardsPage';
import AdminPage from './pages/AdminPage';
import Header from './components/Header';
import { FlashcardsProvider } from './context/flashcards/FlashcardsProvider';
import AuthProvider from './context/auth/AuthProvider';

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
        <AuthProvider>
            <FlashcardsProvider>
                <Header />
                <Routes>
                    <Route path="/Accounting-Online-Flashcards" element={<FlashcardsPage />} />
                    <Route path="/Accounting-Online-Flashcards/admin" element={<AdminPage />} />
                </Routes>
            </FlashcardsProvider>
        </AuthProvider>        
    );
}

export default App;
