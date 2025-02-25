import { motion} from "motion/react"
import { TFlashcard } from '../types/types.ts'

interface FlashCardProps
{
    cardData: TFlashcard
    isFlipped: boolean
    setIsFlipped: (flipped: boolean) => void;
}

function FlashCard({cardData, isFlipped, setIsFlipped}: FlashCardProps) {


    //if logic for showing front and back side of the card. Likely using the useState hook to toggle between the two states.
    if(isFlipped) {
        return (
            <motion.button
                className="w-full h-48 block p-6 cursor-pointer bg-white border border-grey-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex items-center justify-center"
                onClick={() => setIsFlipped(false)}
                initial={{ rotateY: 180 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 0.5 }}
                style={{ transformStyle: "preserve-3d" }}>
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