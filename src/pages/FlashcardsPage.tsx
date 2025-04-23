import { useEffect, useState } from "react";
import FlashcardContainer from "../components/FlashcardContainer";
// import flashcardData from "../data/flashcard-data";
// import { TFlashcardSet } from "../types/types";
import Dropdown from "../components/Dropdown";
import { useFlashcards } from "../context/flashcards/useFlashcards";
import { Category, Flashcard } from "../context/flashcards/flashcardsContext";

import Instructions from "../components/Instructions";

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
    const [selectedFlashcardSetIndex, setSelectedFlashcardSetIndex] = useState<number>(0);
    const [currentFlashcardSet, setCurrentFlashcardSet] = useState<Flashcard[]>(null!);
    const [currentCategory, setCurrentCategory] = useState<Category>(null!);

    const {categories, flashcards, isLoadingData, getFlashcardsByCategory} = useFlashcards();

    //console.log(flashcards);
    //console.log(categories);
 
    useEffect(() => {
        if (isLoadingData) return;

        if (selectedFlashcardSetIndex !== null && categories.length > 0 && flashcards.length > 0) {
            const selectedCategory = categories[selectedFlashcardSetIndex];
            if (selectedCategory) {
                const flashcards = getFlashcardsByCategory(selectedCategory.id);
                setCurrentFlashcardSet(flashcards);
                setCurrentCategory(selectedCategory);
            }
        }
    }, [selectedFlashcardSetIndex, categories, flashcards, isLoadingData, getFlashcardsByCategory]);
    
    if (isLoadingData || !currentFlashcardSet || !currentCategory){
        return <div>Loading...</div>
    }

    return (
        <main role="main" className="pb-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full px-4 sm:px-0">
                <div className="flex-1"><Instructions /></div>
            
            <div className="flex-1">
            <Dropdown

                id="select-topic-dropdown"
                title="Select Accounting Topic:"
                options={categories.map(category => {return category.name})}
                selectedIndex={selectedFlashcardSetIndex}
                setSelectedIndex={setSelectedFlashcardSetIndex}
                ariaLabel="flashcard topic"
            />
            </div>
            <div className="flex-1"></div>
            </div>
            {/* Inline styles will be removed once TailwindCSS is added to project */}
            <div style={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center"
                }}
                role="region"
                aria-label="Flashcard content">
                {/* Renders the selected flashcard set inside the FlashcardContainer */}
                <FlashcardContainer flashcards={currentFlashcardSet} category={currentCategory} />
            </div>
        </main>
    );
}

export default FlashcardsPage;