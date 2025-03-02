import { useState } from "react";
import { TFlashcard, TFlashcardSet } from "../types/types";
import FlashCard from "./FlashCard.tsx";

/**
 * FlashcardContainer Component
 * 
 * This component displays a flashcard set and allows the user to navigate 
 * through the flashcards using "Next" and "Prev" buttons.
 * 
 * Props:
 * @param {TFlashcardSet} flashcardSet - The selected set of flashcards to display.
 */
const FlashcardContainer = ({ flashcardSet }: { flashcardSet: TFlashcardSet }) => {
    // State to track the current flashcard index
    const [currentIndex, setCurrentIndex] = useState(0);
    //set isFlipped state to true so that the card is facing front side up
    const [isFlipped, setIsFlipped] = useState(true);

    /**
     * Moves to the next flashcard in the set.
     * Loops back to the first card when reaching the end.
     */
    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % flashcardSet.flashcards.length);
        setIsFlipped(true);
    };

    /**
     * Moves to the previous flashcard in the set.
     * Loops back to the last card when at the first card.
     */
    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + flashcardSet.flashcards.length) % flashcardSet.flashcards.length);
        setIsFlipped(true);
    };

    // Store the current flashcard in a variable for better readability
    const currentFlashcard : TFlashcard = flashcardSet.flashcards[currentIndex];

    return (
        /**
         * Flashcard display container.
         * 
         * - Uses flexbox for centering.
         * - Currently relies on inline styles, which will be replaced by TailwindCSS.
         */
        <div className="flex flex-col items-center mt-10">
            {/* Displays flashcard set category and description */}
            <h1>{flashcardSet.category}</h1>
            <h1 className="my-8">{flashcardSet.description}</h1>
            {/* FlashCard Component */}
            <FlashCard cardData={currentFlashcard} isFlipped={isFlipped} setIsFlipped={setIsFlipped} />
            
            {/* Navigation buttons for switching flashcards */}
            <div className="flex gap-10 items-center mt-10">
                <button className="button" onClick={handlePrev}>← Prev</button>
                <p>{currentIndex + 1}/{flashcardSet.flashcards.length}</p>  
                <button className="button" onClick={handleNext}>Next →</button>
            </div>
        </div>
    );
};

export default FlashcardContainer;
