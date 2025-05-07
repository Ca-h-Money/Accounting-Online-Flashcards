import { createContext } from "react";

export type Category = {
    id: string;
    name: string;
    description: string;
    order: number;
};
  
export type Flashcard = {
    id: string;
    categoryId: string;
    front: string;
    back: string[];
    imgSrc?: string;
};
  
export type FlashcardsContextType = {
    categories: Category[];
    flashcards: Flashcard[];
    getFlashcardsByCategory: (categoryId: string) => Flashcard[];
    isLoadingData: boolean;
    isDataError: boolean;
    dataError: Error | null;
    editCategory: (params: { id: string; updates: Partial<Category> }) => void;
    editFlashcard: (flashcard: Flashcard) => void;
    deleteCategory: (id: string) => void;
    deleteFlashcard: (flashcard: Flashcard) => void;
    addCategory: (category: Omit<Category, "id">) => void;
    addFlashcard: (flashcard: Omit<Flashcard, "id">) => void;
};
  
export const FlashcardsContext = createContext<FlashcardsContextType | undefined>(undefined);