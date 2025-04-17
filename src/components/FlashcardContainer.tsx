import { useEffect, useState } from "react";
import { TFlashcard, TFlashcardSet } from "../types/types";
import FlashCard from "./FlashCard.tsx";
import Button from "./Button.tsx";
import CheckboxButton from "./CheckboxButton.tsx";
import { FaShuffle, FaArrowLeftLong, FaArrowRightLong, FaCircleQuestion } from "react-icons/fa6";
import HintModal from "./HintModal";

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
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    // set isInitialLoad state that is true on page load and false after any interaction
    const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
    // set showTooltip state to true on initial container load
    const [showTooltip, setShowTooltip] = useState<boolean>(false);
    // set isFlipped state to true so that the card is facing front side up
    const [isFlipped, setIsFlipped] = useState<boolean>(true);
    // Set isRandomized state to false so the cards retain the order they are loaded in
    const [isRandomized, setIsRandomized] = useState<boolean>(false);
    // Store the current flashcardSet in an array
    const [currentSet, setCurrentSet] = useState<TFlashcard[]>(flashcardSet.flashcards);

    //for modal
    const [showModal, setShowModal] = useState(false);
    const [hintLetter, setHintLetter] = useState("");

    useEffect(() => {
        // Reset currentIndex, flipped state, and randomize when flashcardSet changes
        setCurrentIndex(0);
        setIsFlipped(true);
        setIsRandomized(false);
        setCurrentSet(flashcardSet.flashcards);
    }, [flashcardSet])

    // Wait 1 second after mount, then show tooltip
    useEffect(() => {
        const timer = setTimeout(() => {
          setShowTooltip(true);
        }, 1000);
    
        return () => clearTimeout(timer);
      }, []);

    /**
     * Moves to the next flashcard in the set.
     * Loops back to the first card when reaching the end.
     */
    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % flashcardSet.flashcards.length);
        setIsFlipped(true);
        setIsInitialLoad(false);
    };

    /**
     * Moves to the previous flashcard in the set.
     * Loops back to the last card when at the first card.
     */
    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + flashcardSet.flashcards.length) % flashcardSet.flashcards.length);
        setIsFlipped(true);
        setIsInitialLoad(false);
    };

    /**
     * 
     * Function to shuffle the flashcard set using the Fisher-Yates algorithm 
     * (https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
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

    //function for the help button
    //add logic for cardData.back.length > 1
    const handleHelpClick = () => {
        const backData = currentFlashcard.back 
        if (Array.isArray(backData) && backData.length > 1) {
            // Two parts to the answer (e.g., Debit / Credit)
            const leftHint = backData[0]?.charAt(0) ?? "";
            const rightHint = backData[1]?.charAt(0) ?? "";
            setHintLetter(`${leftHint} , ${rightHint}`);
        }else{
        const currentFlashcard = currentSet[currentIndex];
        const fullAnswer = String(currentFlashcard.back);
        const shorten = fullAnswer.substring(0, 1);
        setHintLetter(shorten);
        setShowModal(true);
        }
        setShowModal(true)
    };

    return (
        /**
         * Flashcard display container.
         * 
         * - Uses flexbox for centering.
         */
        <div
            role="region"
            aria-label={`Flashcard ${currentIndex + 1} of ${flashcardSet.flashcards.length}`}
            className="flex flex-col items-center mt-2 sm:w-2xl sm:max-w-2xl"
        >
            {/* Displays flashcard set category and description */}
            <h2 className="text-balance h-35 sm:h-17 my-4 text-2xl text-black dark:text-white">{flashcardSet.description}</h2>
            {/* FlashCard Component */}
            <FlashCard 
                cardData={currentFlashcard} 
                showTooltip={showTooltip}
                setShowTooltip={setShowTooltip}
                isFlipped={isFlipped} 
                setIsFlipped={setIsFlipped} 
                isInitialLoad={isInitialLoad}
                setIsInitialLoad={setIsInitialLoad}
            />
            
            {/* Navigation buttons for switching flashcards */}
            <div className="w-full flex flex-row gap-5 sm:gap-10 items-center h-14 mt-4">
                <CheckboxButton 
                    aria-label="Shuffle Button"
                    title={`Click to ${isRandomized ? "unshuffle" : "shuffle"}`}
                    className="border border-gray-300 rounded-md p-2 h-full"
                    isChecked={isRandomized} 
                    onClick={handleToggleRandomize}>
                    Shuffle<FaShuffle  size={20} aria-hidden={true}/>
                </CheckboxButton>
                
                <Button 
                    aria-label="Previous Flashcard Button"
                    title={`Click to see previous flashcard`}
                    className="h-full text-green-800 font-bold hover:text-green-900"
                    onClick={handlePrev}>
                    Back<FaArrowLeftLong size={20} aria-hidden={true} />
                </Button>
                <p 
                    className="flex-1 font-semibold text-lg text-black dark:text-white"
                >
                    {currentIndex + 1}/{flashcardSet.flashcards.length}
                </p>  
                <Button
                    aria-label="Next Flashcard Button"
                    title={`Click to see next flashcard`}
                    className="h-full text-green-800 font-bold hover:text-green-900"
                    onClick={handleNext}>
                    Next<FaArrowRightLong size={20} aria-hidden={true} />
                </Button>
                <Button
                    aria-label="Help Button"
                    title={'Click to see a hint'}
                    className="h-full border border-blue-400 text-blue-600 dark:text-blue-300 rounded-md p-2"
                    onClick={handleHelpClick}>
                   Help<FaCircleQuestion size={20} aria-hidden={true} />
                </Button>
                {showModal && (
                <HintModal hintLetter={hintLetter} onClose={() => setShowModal(false)} />
                )}
            </div>
        </div>
    );
};

export default FlashcardContainer;
