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
    addCategory: (category: Omit<Category, "id">) => void;
    editCategory: (params: { id: string; updates: Partial<Category> }) => void;
    deleteCategory: (id: string) => void;
    categoryStatus: string;
    reorderCategories: (params: { fromIndex: number; toIndex: number }) => void;
    addFlashcard: (flashcard: Omit<Flashcard, "id">) => void;
    editFlashcard: (flashcard: Flashcard) => void;
    deleteFlashcard: (flashcard: Flashcard) => void;
    flashcardStatus: string;
};
  
export const FlashcardsContext = createContext<FlashcardsContextType | undefined>(undefined);