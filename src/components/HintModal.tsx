import React from "react";

interface HintModalProps {
  hintLetter: string;
  onClose: () => void;
}
//<p className="text-2xl text-blue-600 dark:text-blue-300">{hintLetter}</p>
const HintModal: React.FC<HintModalProps> = ({ hintLetter, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">Hint</h2>
          <div className="text-2xl text-blue-600 dark:text-blue-300 whitespace-pre-line">
              {hintLetter}
          </div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default HintModal;
