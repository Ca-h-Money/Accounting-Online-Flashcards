import { createContext } from "react";

export type Category = {
    id: string;
    name: string;
    description: string;
};
  
export type Flashcard = {
    id: string;
    categoryId: string;
    front: string;
    back: string[];
};
  
type FlashcardsContextType = {
    categories: Category[];
    flashcards: Flashcard[];
    getFlashcardsByCategory: (categoryId: string) => Flashcard[];
    isLoading: boolean;
};
  
export const FlashcardsContext = createContext<FlashcardsContextType | undefined>(undefined);