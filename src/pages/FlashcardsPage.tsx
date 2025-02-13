import { useState } from "react";
import FlashcardContainer from "../components/FlashcardContainer";
import flashcardData from "../data/flashcard-data";
import '../App.css';

const FlashcardsPage = () => {
    const [selectedFlashcardSetIndex] = useState(1);

    return (
        <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            height: "100vh",
            textAlign: "center" 
        }}>
            <FlashcardContainer flashcardSet={flashcardData[selectedFlashcardSetIndex]} />
        </div>
    );
}

export default FlashcardsPage;