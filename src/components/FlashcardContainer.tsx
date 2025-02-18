import { useState } from "react";
import { TFlashcard, TFlashcardSet } from "../types/types";
import FlashCard from "./FlashCard.tsx";
import Button from "./Button.tsx";
import CheckboxButton from "./CheckboxButton.tsx";

interface FlashCardContainerProps
{
    flashcardSet: TFlashcardSet
}

/**
 * FlashcardContainer Component
 * 
 * This component displays a flashcard set and allows the user to navigate 
 * through the flashcards using "Next" and "Prev" buttons.
 * 
 * Props:
 * @param {TFlashcardSet} flashcardSet - The selected set of flashcards to display.
 */
const FlashcardContainer = ({ flashcardSet }: FlashCardContainerProps) => {
    // State to track the current flashcard index
    const [currentIndex, setCurrentIndex] = useState(0);

    //set isFlipped state to true so that the card is facing front side up
    const [isFlipped, setIsFlipped] = useState(true);

    //set isFlipped state to true so that the card is facing front side up
    const [isRandomized, setIsRandomized] = useState(false);

    // Store the current flashcardSet in an array
    const [currentSet, setCurrentSet] = useState(flashcardSet.flashcards);

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

    /**
     * 
     * Function to shuffle the flashcard set using the Fisher-Yates algorithm
     */
    const randomizeSet = () => {
        // Create a copy of the original flashcards array
        const shuffledSet = [...flashcardSet.flashcards]; 

        for (let i = shuffledSet.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); // Generate a random index within the remaining unshuffled portion
            [shuffledSet[i], shuffledSet[j]] = [shuffledSet[j], shuffledSet[i]]; // Swap the current element with the randomly chosen element
        }

        return shuffledSet;
    };

    /** 
     * Function to toggle between randomized and original order of flashcards
     */ 
    const handleToggleRandomize = () => {
        if (isRandomized) {
            // Reset to the original flashcard order if currently randomized
            setCurrentSet(flashcardSet.flashcards); 
        } else {
            // Shuffle and update the flashcard set if not randomized
            setCurrentSet(randomizeSet()); 
        }

        // Toggle the isRandomized state
        setIsRandomized((prevState) => !prevState); 

        // Reset the flashcard index to the first card and ensure card is flipped
        setCurrentIndex(0); 
        setIsFlipped(true);
    };

    // Store the current flashcard in a variable for better readability
    const currentFlashcard : TFlashcard = currentSet[currentIndex];

    return (
        /**
         * Flashcard display container.
         * 
         * - Uses flexbox for centering.
         * - Currently relies on inline styles, which will be replaced by TailwindCSS.
         */
        <div className="flex flex-col items-center mt-10 w-md max-w-md">
            {/* Displays flashcard set category and description */}
            <h1>{flashcardSet.category}</h1>
            <p className="my-8">{flashcardSet.description}</p>
            {/* FlashCard Component */}
            <FlashCard cardData={currentFlashcard} isFlipped={isFlipped} setIsFlipped={setIsFlipped} />
            
            {/* Navigation buttons for switching flashcards */}
            <div className="flex gap-10 items-center mt-10">
                <CheckboxButton isChecked={isRandomized} onToggle={handleToggleRandomize}>Random</CheckboxButton>
                <Button onClick={handlePrev}>← Prev</Button>
                <p>{currentIndex + 1}/{flashcardSet.flashcards.length}</p>  
                <Button onClick={handleNext}>Next →</Button>
            </div>
        </div>
    );
};

export default FlashcardContainer;
