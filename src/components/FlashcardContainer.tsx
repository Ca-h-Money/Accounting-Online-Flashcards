import { useState } from "react";
import { TFlashcardSet } from "../types/types";

const FlashcardContainer = ({ flashcardSet }: { flashcardSet: TFlashcardSet }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % flashcardSet.flashcards.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + flashcardSet.flashcards.length) % flashcardSet.flashcards.length);
    };

    return (
        <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center", 
            textAlign: "center", 
        }}>
            <h1>{flashcardSet.category}</h1>
            <p>{flashcardSet.description}</p>
            <p>Front: {flashcardSet.flashcards[currentIndex].front}</p>
            <p>Back: {flashcardSet.flashcards[currentIndex].back}</p>
            <div style={{ 
                display: "flex", 
                flexDirection: "row", 
                alignItems: "center", 
                justifyContent: "center", 
                textAlign: "center", 
            }}>
                <button onClick={handlePrev}>← Prev</button>
                    <p>{currentIndex + 1}/{flashcardSet.flashcards.length}</p>  
                <button onClick={handleNext}>Next →</button>
            </div>
            
        </div>
    );
};

export default FlashcardContainer;