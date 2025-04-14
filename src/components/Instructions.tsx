import React from 'react';

const Instructions: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 w-full sm:max-w-2xl mt-8 border border-gray-200 dark:border-gray-700 text-left">
    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
      How to Use the Flashcards
    </h2>
    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 text-lg">
      <li>Select one of the 3 accounting topics for your flashcards</li>
      <li>Click on the “Shuffle” button to shuffle your flashcards</li>
      <li>Click on the flashcard to see the answer</li>
      <li>Click the “Next Flashcard” button to move onto the next flashcard</li>
    </ul>
  </div>
  );
};

export default Instructions;
