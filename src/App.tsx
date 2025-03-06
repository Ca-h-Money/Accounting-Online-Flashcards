import './App.css'; // Import global styles
import FlashcardsPage from './pages/FlashcardsPage';

/**
 * Root component of the application.
 * 
 * - Currently renders the FlashcardsPage component.
 * - Can be expanded in the future to include navigation and routing.
 */
function App() {
    return (
        /**
         * Main entry point of the application.
         * Currently, it only renders FlashcardsPage.
         * 
         * If additional pages or features are added in the future (e.g., routing),
         * this file will serve as the top-level component.
         */
        <FlashcardsPage />
    );
}

export default App;
