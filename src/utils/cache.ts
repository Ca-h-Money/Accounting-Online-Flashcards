import { Category, Flashcard } from "../context/flashcards/flashcardsContext";

// Key used for storing flashcard data in localStorage
const LOCAL_CACHE_KEY = "flashcards_data";

// Type definition for the structure of cached flashcard data
type FlashcardCache = {
    lastUpdated: string;           // ISO string timestamp of last update
    categories: Category[];        // List of category objects
    flashcards: Flashcard[];       // List of flashcard objects
};

/* eslint-disable @typescript-eslint/no-unsafe-return */

/**
 * Retrieves cached flashcard data from localStorage.
 * 
 * @returns {FlashcardCache | null} Parsed flashcard data or null if not found or if JSON parsing fails.
 */
export const getCachedFlashcards = (): FlashcardCache | null => {
    try {
        const raw = localStorage.getItem(LOCAL_CACHE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        // In case of JSON parse error or other exceptions, return null
        return null;
    }
};

/**
 * Saves flashcard data to localStorage.
 * 
 * @param {FlashcardCache} data - Object containing lastUpdated timestamp, categories, and flashcards.
 */
export const saveFlashcardCache = (data: FlashcardCache) => {
    localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(data));
};
