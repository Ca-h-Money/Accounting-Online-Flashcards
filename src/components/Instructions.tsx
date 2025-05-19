import React, { useState } from 'react';
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

const Instructions: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 w-full sm:max-w-2xl mt-8 
                    border border-gray-200 dark:border-green-700 text-left md:ml-3">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          How to use the Flashcards
        </h2>
        <button
          onClick={() => setIsCollapsed(prev => !prev)}
          className="text-black dark:text-white hover:underline focus:outline-none cursor-pointer"
          aria-label={isCollapsed ? 'Expand instructions' : 'Collapse instructions'}
        >
          <div className="flex gap-1 items-center">
            <span>{isCollapsed ? "Show" : "Hide"}</span>
            {isCollapsed ? <FaAngleDown size={20} /> : <FaAngleUp size={20} />}
            
          </div>
        </button>
      </div>

      {!isCollapsed && (
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 text-sm mt-4">
          <li>Select one of the 3 accounting topics for your flashcards</li>
          <li>Click on the “Shuffle” button to shuffle your flashcards</li>
          <li>Click on the flashcard to see the answer</li>
          <li>Click the “Next Flashcard” button to move onto the next flashcard</li>
          <li>Click the “Hint” button to see the first letter of the answer</li>
          <li>Keyboard Shortcuts: ←/→ for Previous/Next, Space to Flip, H for Hint, S to Shuffle</li>
        </ul>
      )}
    </div>
  );
};

export default Instructions;
