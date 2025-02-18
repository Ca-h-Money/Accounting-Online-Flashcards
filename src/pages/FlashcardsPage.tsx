import { useState } from "react";
import FlashcardContainer from "../components/FlashcardContainer";
import flashcardData from "../data/flashcard-data";
import { TFlashcardSet } from "../types/types";

/**
 * FlashcardsPage Component
 * 
 * This page displays a flashcard set based on the selected index.
 * The flashcard container is centered using inline styles, which will
 * be replaced once TailwindCSS is integrated into the project.
 */
const FlashcardsPage = () => {
    // State to track which flashcard set is currently selected
    // Default set index is 0 (first set in the array)
    const [selectedFlashcardSetIndex] = useState(2);

    // Store the current flashcardSet in a variable for better readability
    const currentFlashcardSet : TFlashcardSet = flashcardData[selectedFlashcardSetIndex];

    return (
        // Inline styles will be removed once TailwindCSS is added to project
        <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            height: "100vh",
            textAlign: "center" 
        }}>
            {/* Renders the selected flashcard set inside the FlashcardContainer */}
            <FlashcardContainer flashcardSet={currentFlashcardSet} />
        </div>
    );
}

export default FlashcardsPage;