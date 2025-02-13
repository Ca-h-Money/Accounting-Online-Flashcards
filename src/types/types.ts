/**
 * Represents a single flashcard with a front (question) and a back (answer).
 * The back side contains one or more possible answers.
 * @typedef {Object} TFlashcard
 * @property {string} front - The front side of the flashcard (question).
 * @property {string[]} back - The back side of the flashcard (answer(s)).
 */
export type TFlashcard = {
    front: string;
    back: string[];
};

/**
 * Represents a flashcard set, which includes a category, description, 
 * and an array of flashcards.
 * @typedef {Object} TFlashcardSet
 * @property {string} category - The name of the flashcard set.
 * @property {string} description - A brief description of the flashcard set.
 * @property {TFlashcard[]} flashcards - An array of flashcards within this set.
 */
export type TFlashcardSet = {
    category: string;
    description: string;
    flashcards: TFlashcard[];
};

/**
 * Represents the complete collection of flashcard sets.
 * This is an array containing multiple flashcard sets.
 * @typedef {TFlashcardSet[]} TFlashcardData
 */
export type TFlashcardData = TFlashcardSet[];
