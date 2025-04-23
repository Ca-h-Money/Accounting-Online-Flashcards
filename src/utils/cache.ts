import { Category, Flashcard } from "../context/flashcards/flashcardsContext";
const LOCAL_CACHE_KEY = "flashcards_data";

type FlashcardCache = {
    lastUpdated: string;
    categories: Category[];
    flashcards: Flashcard[];
};

/* eslint-disable @typescript-eslint/no-unsafe-return */
export const getCachedFlashcards = (): FlashcardCache | null => {
    try {
        const raw = localStorage.getItem(LOCAL_CACHE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
};

export const saveFlashcardCache = (data: FlashcardCache) => {
    localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(data));
};
