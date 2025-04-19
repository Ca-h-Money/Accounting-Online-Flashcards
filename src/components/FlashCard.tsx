import { motion} from "motion/react"
import { TFlashcard } from '../types/types.ts'
import Tooltip from "./Tooltip.tsx"


interface FlashCardProps
{
    cardData: TFlashcard;
    isFlipped: boolean;
    setIsFlipped: (flipped: boolean) => void;
    showTooltip: boolean;
    setShowTooltip: (showTooltip: boolean) => void;
    isInitialLoad: boolean;
    setIsInitialLoad: (isInitialLoad: boolean) => void;
}

function FlashCard({cardData, isFlipped, setIsFlipped, showTooltip, setShowTooltip, isInitialLoad, setIsInitialLoad}: FlashCardProps) {


    //if logic for showing front and back side of the card. Likely using the useState hook to toggle between the two states.
    if(isFlipped) {
        return (
            <motion.button
                className="w-[280px] h-[280px] sm:w-[850px] sm:h-[450px] flex p-6 cursor-pointer rounded-lg shadow-sm
                        bg-white dark:bg-[#31A959]  dark:border-gray-700 dark:text-black
                        hover:bg-gray-100 dark:hover:bg-[#00A86B] items-center justify-center"
                //id="lines"
                onClick={() => {
                    setIsFlipped(false);
                    setShowTooltip(false);
                    setIsInitialLoad(false);
                }}
                initial={{ rotateY: isInitialLoad ? 0 : 180 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 0.5 }}
                style={{ transformStyle: "preserve-3d" }}>
                {showTooltip && 
                    <Tooltip 
                        className="absolute bottom-5 sm:bottom-10 right-3 sm:right-10"
                        content="Click to see the answer"
                    />}

                
                {/* {showTooltip && (
                    <Tooltip 
                        className="absolute top-[-50px] left-1/2 transform -translate-x-1/2"
                        content="Click to see the answer"
                    />
                )}

                {showTooltip && (
                    <Tooltip 
                        className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2"
                        content="Click to see the answer"
                    />
                )}

                {showTooltip && (
                    <Tooltip 
                        className="absolute top-1/2 left-[-60px] transform -translate-y-1/2"
                        content="Click to see the answer"
                    />
                )}

                {showTooltip && (
                    <Tooltip 
                        className="absolute top-1/2 right-[-60px] transform -translate-y-1/2"
                        content="Click to see the answer"
                    />
                )}    

                {showTooltip && (
                    <Tooltip 
                        className="absolute top-2 left-2"
                        content="Click to see the answer"
                    />
                )}

                {showTooltip && (
                    <Tooltip 
                        className="absolute top-2 right-2"
                        content="Click to see the answer"
                    />
                )}

                {showTooltip && (
                    <Tooltip 
                        className="absolute bottom-2 left-2"
                        content="Click to see the answer"
                    />
                )}

                {showTooltip && (
                    <Tooltip 
                        className="absolute bottom-2 right-2"
                        content="Click to see the answer"
                    />
                )} */}
            <h3 className="text-7xl font-bold tracking-tight text-gray-900 dark:text-white">{cardData.front}</h3>
            </motion.button>)
    }
    else if(cardData.back.length > 1){
        return (
            <motion.button
                className="w-[280px] h-[280px] sm:w-[850px] sm:h-[450px] flex p-6 cursor-pointer bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100
                            dark:bg-gray-800 dark:border-gray-700 neon-border dark:hover:bg-gray-700 items-center justify-center"
                onClick={() => setIsFlipped(true)}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 180 }}
                transition={{ duration: 0.5 }}
                style={{ transformStyle: "preserve-3d" }}>
                {/* Symmetrical T-shaped layout */}
                <div
                className="grid grid-cols-2 grid-rows-[20%_80%] w-full h-full relative"
                style={{ transform: "rotateY(180deg)" }}>
                    {/* Vertical center line */}
                    <div className="absolute inset-y-0 left-1/2 w-px bg-gray-400 dark:bg-gray-500 transform -translate-x-1/2" />
                
                    {/* Left Section */}
                    <div className="flex flex-col items-center justify-between p-2">
                        {/*Label*/}
                        <div className="flex flex-col items-center justify-end h-16 w-full">
                        <span className="text-lg font-medium text-gray-600 dark:text-gray-300">
                            Debit
                        </span>
                        <div className="w-full h-px bg-gray-400 dark:bg-gray-500 mt-1" /> {/* Horizontal line */}
                        </div>
                        {/* Content 
                        sm:text-4xl*/}
                        <span className="text-5xl  font-bold tracking-tight text-gray-900 dark:text-white">
                        {cardData.back[0]}
                        </span>
                    </div>
                
                    {/* Right Section */}
                    <div className="flex flex-col items-center justify-between p-2">
                        {/*Label*/}
                        <div className="flex flex-col items-center justify-end h-16 w-full">
                        <span className="text-lg font-medium text-gray-600 dark:text-gray-300">
                            Credit
                        </span>
                        <div className="w-full h-px bg-gray-400 dark:bg-gray-500 mt-1" /> {/* Horizontal line */}
                        </div>
                        {/* Content 
                        sm:text-4xl*/}
                        <span className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {cardData.back[1]}
                        </span>
                    </div>
                </div>
            </motion.button>) 
    }
    else{
        return (
            <motion.button
                className="w-[280px] h-[280px] sm:w-[850px] sm:h-[450px] flex p-6 cursor-pointer bg-[#eed9c4] border border-gray-200 rounded-lg shadow-sm hover:bg-[#f7e7ce] dark:bg-gray-800
                            dark:border-gray-700 neon-border dark:hover:bg-gray-700 items-center justify-center"
                onClick={() => setIsFlipped(true)}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 180,
                   x : [0, 10, -10, 10, -10, 0],
                 }}
                transition={{ duration: 0.5,
                    ease: "easeInOut",
                 }}
                style={{ transformStyle: "preserve-3d" }}>
            {/*Back Content*/}
            <h3 className="text-7xl font-bold tracking-tight text-gray-900 dark:text-white" style={{transform: "rotateY(180deg)"}}>{cardData.back[0]}</h3>
            </motion.button>)
    }
}
export default FlashCard;