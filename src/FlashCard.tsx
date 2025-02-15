import { useState } from 'react';
import { motion, MotionConfig } from "motion/react"

interface FlashCardProps {
    frontText: string;
    backText: string;
}



function FlashCard({frontText, backText}: FlashCardProps) {

    const [showAnswer, setShowAnswer] = useState(false);

    //if logic for showing front and back side of the card. Likely using the useState hook to toggle between the two states.
    if(!showAnswer) {
    return (
        <motion.button
            className="w-72 h-48 block p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex items-center justify-center"
            onClick={() => setShowAnswer(true)}
            initial={{ rotateY: 180 }}
            animate={{ rotateY: 0 }}
            transition={{ duration: 0.5 }}
            style={{ transformStyle: "preserve-3d" }}>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{frontText}</h5>
        </motion.button>)

    }
    else{
        return (
            <motion.button
                className="w-72 h-48 block p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex items-center justify-center"
                onClick={() => setShowAnswer(false)}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 180 }}
                transition={{ duration: 0.5 }}
                style={{ transformStyle: "preserve-3d" }}>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white" style={{transform: "rotateY(180deg)"}}>{backText}</h5>
            </motion.button>)
    }
}



export default FlashCard;