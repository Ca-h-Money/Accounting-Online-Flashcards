import { useEffect, useState, ReactNode } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { FlashcardsContext, Category, Flashcard } from "./flashcardsContext";
  
  
export const FlashcardsProvider = ({ children }: { children: ReactNode }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            console.log("LOADING FLASHCARD DATA");

            const catSnap = await getDocs(collection(db, "categories"));
            const categoriesData = catSnap.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Category[];

            const flashSnap = await getDocs(collection(db, "flashcards"));
            const flashcardsData = flashSnap.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Flashcard[];

            setCategories(categoriesData);
            setFlashcards(flashcardsData);
            setIsLoading(false);
        };

        void loadData();
        }, []);

        const getFlashcardsByCategory = (categoryId: string) => {
            return flashcards.filter((f) => f.categoryId === categoryId);
        };

        return (
        <FlashcardsContext.Provider
            value={{ categories, flashcards, getFlashcardsByCategory, isLoading }}
        >
            {children}
        </FlashcardsContext.Provider>
    );
};
  