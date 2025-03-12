import FlashcardsPage from './pages/FlashcardsPage';
import Header from './components/Header';

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
        <>
            <Header />
            <FlashcardsPage />
        </>
        
    );
}

export default App;
