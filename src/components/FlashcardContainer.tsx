import { useEffect, useState } from "react";
import { Category, Flashcard } from "../context/flashcards/flashcardsContext.ts";
import FlashCard from "./FlashCard.tsx";
import Button from "./Button.tsx";
import { FaShuffle, FaArrowLeftLong, FaArrowRightLong, FaCircleQuestion } from "react-icons/fa6";
import HintModal from "./HintModal";

interface FlashCardContainerProps
{
    flashcards: Flashcard[],
    category: Category
}

/**
 * FlashcardContainer Component
 * 
 * This component displays a flashcard set and allows the user to navigate 
 * through the flashcards using "Next" and "Prev" buttons.
 * 
 */
const FlashcardContainer = ({ flashcards, category }: FlashCardContainerProps) => {
    // State to track the current flashcard index
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    // set isInitialLoad state that is true on page load and false after any interaction
    const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
    // set showTooltip state to true on initial container load
    const [showTooltip, setShowTooltip] = useState<boolean>(false);
    // set isFlipped state to true so that the card is facing front side up
    const [isFlipped, setIsFlipped] = useState<boolean>(true);
    // Store the current flashcardSet in an array
    const [currentSet, setCurrentSet] = useState<Flashcard[]>(flashcards);

    //for modal
    const [showModal, setShowModal] = useState(false);
    const [hintLetter, setHintLetter] = useState("");

    useEffect(() => {
        handleRandomize();
        resetFlashcards();
    }, [flashcards])

    // Wait 1 second after mount, then show tooltip
    useEffect(() => {
        const timer = setTimeout(() => {
          setShowTooltip(true);
        }, 1000);
    
        return () => clearTimeout(timer);
    }, []);

    // Keydown listeners for arrow key/spacebar events
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                handlePrev();
            } else if (e.key === 'ArrowRight') {
                handleNext()
            } else if (e.key === ' ') {
                setIsFlipped(prevState => !prevState);
                setShowTooltip(false);
            }
	    };
	    document.addEventListener('keydown', handleKeyPress);

        return function () {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    /**
     * Moves to the next flashcard in the set.
     * Loops back to the first card when reaching the end.
     */
    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % flashcards.length);
        setIsFlipped(true);
        setIsInitialLoad(false);
    };

    /**
     * Moves to the previous flashcard in the set.
     * Loops back to the last card when at the first card.
     */
    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
        setIsFlipped(true);
        setIsInitialLoad(false);
    };

    /**
     * 
     * Shuffle the flashcard set using the Fisher-Yates algorithm 
     * (https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
     */
    const randomizeSet = () => {
        // Create a copy of the original flashcards array
        const shuffledSet = [...flashcards]; 

        for (let i = shuffledSet.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); // Generate a random index within the remaining unshuffled portion
            [shuffledSet[i], shuffledSet[j]] = [shuffledSet[j], shuffledSet[i]]; // Swap the current element with the randomly chosen element
        }

        return shuffledSet;
    };

    /** 
     * Randomize the flashcard order
     */ 
    const handleRandomize = () => {
        setCurrentSet(randomizeSet()); 
    };

    /** 
     * Reset flashcards to first card and ensure card is flipped
     */ 
    const resetFlashcards = () => {
        setCurrentIndex(0); 
        setIsFlipped(true);
    };

    // Store the current flashcard in a variable for better readability
    const currentFlashcard : Flashcard = currentSet[currentIndex];

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
            aria-label={`Flashcard ${currentIndex + 1} of ${flashcards.length}`}
            className="flex flex-col items-center mt-2 sm:w-2xl sm:max-w-2xl"
        >
            {/* Displays flashcard set category and description */}
            <h2 className="text-balance text-center my-4 mx-1 text-2xl sm:text-4xl font-bold
                 text-black dark:text-white px-4">
                {category.description}</h2>

            {/* FlashCard Component */}
            {
                currentFlashcard ? 
                <>
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
                    <div className="flex flex-col flex-wrap justify-center gap-4 md:flex-row mt-4">
                        <div className="flex justify-center">
                        <Button 
                            aria-label="Shuffle Button"
                            title="Click to shuffle flashcards"
                            className="border border-gray-300 rounded-md px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base flex items-center gap-1"
                            onClick={() => {
                                handleRandomize();
                                resetFlashcards();
                            }}>
                            Shuffle <FaShuffle size={16} aria-hidden={true} />
                        </Button>
                        </div>

                        <div className="flex justify-center items-center gap-4">
                        <Button 
                            aria-label="Previous Flashcard Button"
                            title="Click to see previous flashcard"
                            onClick={handlePrev}
                            className="px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base text-green-800 font-bold hover:text-green-900 flex items-center gap-1"
                            >
                            Back <FaArrowLeftLong size={16} aria-hidden={true} />
                        </Button>
                        <p 
                            className="flex-1 font-semibold text-lg text-black dark:text-white"
                        >
                            {currentIndex + 1}/{flashcards.length}
                        </p>  
                        <Button
                            aria-label="Next Flashcard Button"
                            title="Click to see next flashcard"
                            onClick={handleNext}
                            className="px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base text-green-800 font-bold hover:text-green-900 flex items-center gap-1"
                            >
                            Next <FaArrowRightLong size={16} aria-hidden={true} />
                        </Button>
                        </div>
                        
                        <div className="flex justify-center">
                        <Button
                            aria-label="Help Button"
                            title="Click to see a hint"
                            onClick={handleHelpClick}
                            className="px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base border border-blue-400 text-blue-600 dark:text-blue-300 rounded-md flex items-center gap-1"
                            >
                            Hint <FaCircleQuestion size={16} aria-hidden={true} />
                        </Button>
                        </div>
                        {showModal && (
                        <HintModal hintLetter={hintLetter} onClose={() => setShowModal(false)} />
                        )}
                    </div>
                </>
            : 
                <h3 className="p-20 text-3xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white 
                text-center break-words px-2 backface-hidden">
                    No flashcards exist in this category
                </h3>
            }
        </div>
    );
};

export default FlashcardContainer;
