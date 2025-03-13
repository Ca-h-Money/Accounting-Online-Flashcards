// Tooltip.tsx
import { motion } from "framer-motion";
import { GiClick } from "react-icons/gi";

interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
    content: string;
}

export default function Tooltip({ content, ...props }: TooltipProps) {
  return (
    
    <motion.div
        key="tooltip"
        // Scale from 0 → 1, with a bit of bounce
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        
        // Spring settings for bounce effect
        transition={{ 
            type: "spring", 
            stiffness: 300,  // increase for more "pop"
            damping: 20      // lower for more oscillation
        }}

        className={`
            text-black
            dark:text-white
            px-3
            py-2
            rounded-lg
            text-md
            whitespace-nowrap
            pointer-events-none
            z-50
            ${props.className}
        `}
    >
        <div className="flex gap-2 items-center"><GiClick size={30}/>{content}</div>
    </motion.div>
  );
}
