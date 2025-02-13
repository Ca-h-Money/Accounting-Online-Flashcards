export type TFlashcard = {
    front: string;
    back: string[];
};
  
export type TFlashcardSet = {
    category: string;
    description: string;
    flashcards: TFlashcard[];
};
  
export type TFlashcardData = TFlashcardSet[];