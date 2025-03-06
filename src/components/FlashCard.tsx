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
                className="relative w-full h-48 block p-6 cursor-pointer bg-white border border-grey-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex items-center justify-center"
                onClick={() => {
                    setIsFlipped(false);
                    setShowTooltip(false);
                    setIsInitialLoad(false);
                }}
                initial={{ rotateY: isInitialLoad ? 0 : 180 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 0.5 }}
                style={{ transformStyle: "preserve-3d" }}>
                {/* {showTooltip && 
                    <Tooltip 
                        className="absolute bottom-2 right-2" 
                        content="Click to see the answer"
                    />} */}

                {/* Outside the card (Above) */}
                {showTooltip && (
                    <Tooltip 
                        className="absolute top-[-50px] left-1/2 transform -translate-x-1/2"
                        content="Click to see the answer"
                    />
                )}

                {/* Outside the card (Below) */}
                {showTooltip && (
                    <Tooltip 
                        className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2"
                        content="Click to see the answer"
                    />
                )}

                {/* Outside the card (Far left) */}
                {showTooltip && (
                    <Tooltip 
                        className="absolute top-1/2 left-[-60px] transform -translate-y-1/2"
                        content="Click to see the answer"
                    />
                )}

                {/* Outside the card (Far right) */}
                {showTooltip && (
                    <Tooltip 
                        className="absolute top-1/2 right-[-60px] transform -translate-y-1/2"
                        content="Click to see the answer"
                    />
                )}    

                {/* Inside the card (Top-left) */}
                {showTooltip && (
                    <Tooltip 
                        className="absolute top-2 left-2"
                        content="Click to see the answer"
                    />
                )}
                {/* Inside the card (Top-right) */}
                {showTooltip && (
                    <Tooltip 
                        className="absolute top-2 right-2"
                        content="Click to see the answer"
                    />
                )}

                {/* Inside the card (Bottom-left) */}
                {showTooltip && (
                    <Tooltip 
                        className="absolute bottom-2 left-2"
                        content="Click to see the answer"
                    />
                )}

                {/* Inside the card (Bottom-right) */}
                {showTooltip && (
                    <Tooltip 
                        className="absolute bottom-2 right-2"
                        content="Click to see the answer"
                    />
                )}
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{cardData.front}</h5>
            </motion.button>)

    }
    //Note that if statements cannot be written inside of a return statement and therefore we will likely 
    //have a else if and else chain to handle this logic for the back side of the card
    else{
        return (
            <motion.button
                className="w-full h-48 block p-6 cursor-pointer bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex items-center justify-center"
                onClick={() => setIsFlipped(true)}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 180 }}
                transition={{ duration: 0.5 }}
                style={{ transformStyle: "preserve-3d" }}>
                {/* Note that later on we will need to write in some logic checking the back.length and displaying different styles based on what the back is*/}
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white" style={{transform: "rotateY(180deg)"}}>{cardData.back[0]}</h5>
            </motion.button>)
    }
}



export default FlashCard;