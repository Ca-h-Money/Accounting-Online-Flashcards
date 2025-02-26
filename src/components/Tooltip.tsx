// Tooltip.tsx
import { motion } from "framer-motion";

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
            text-white
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
        {content}
    </motion.div>
  );
}
