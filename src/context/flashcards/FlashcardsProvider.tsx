import { ReactNode, useMemo } from "react";
import { collection, getDocs, updateDoc, deleteDoc, addDoc, doc } from "firebase/firestore";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "../../firebase";
import { Category, Flashcard } from "./flashcardsContext";
import { FlashcardsContext } from "./flashcardsContext";


// ----- Data Fetching Functions -----
async function fetchCategories(): Promise<Category[]> {
    const catSnap = await getDocs(collection(db, "categories"));
    return catSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    })) as Category[];
}

async function fetchFlashcards(): Promise<Flashcard[]> {
    const flashSnap = await getDocs(collection(db, "flashcards"));
    return flashSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    })) as Flashcard[];
}


export const FlashcardsProvider = ({ children }: { children: ReactNode }) => {
    /* eslint-disable @typescript-eslint/no-unsafe-call */
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    const queryClient = useQueryClient();

    const {
        data: categories = [],
        isLoading: isCategoriesLoading,
        isError: isCategoriesError,
        error: categoriesError,
    
    } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    });

    const addCategoryMutation = useMutation({
        mutationFn: async (newCategory: Omit<Category, "id">) => {
            await addDoc(collection(db, "categories"), newCategory);
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });

    const editCategoryMutation = useMutation({
        mutationFn: async ({ id, updates }: { id: string; updates: Partial<Category> }) => {
          const categoryRef = doc(db, "categories", id);
          await updateDoc(categoryRef, updates);
        },
        onSuccess: () => {
          // Invalidate the "categories" query so it refetches
          void queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });

    const deleteCategoryMutation = useMutation({
        mutationFn: async (id: string) => {
            const categoryRef = doc(db, "categories", id);
            await deleteDoc(categoryRef);
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });

    const {
        data: flashcards = [],
        isLoading: isFlashcardsLoading,
        isError: isFlashcardsError,
        error: flashcardsError,
    } = useQuery<Flashcard[]>({
        queryKey: ["flashcards"], 
        queryFn: fetchFlashcards
    });

    const addFlashcardMutation = useMutation({
        mutationFn: async (newFlashcard: Omit<Flashcard, "id">) => {
            await addDoc(collection(db, "flashcards"), newFlashcard);
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ["flashcards"] });
        },
    });

    const editFlashcardMutation = useMutation({
        mutationFn: async ({ id, updates }: { id: string; updates: Partial<Flashcard> }) => {
          const flashcardRef = doc(db, "flashcards", id);
          await updateDoc(flashcardRef, updates);
        },
        onSuccess: () => {
          // Refetch flashcards after successful update
          void queryClient.invalidateQueries({ queryKey: ["flashcards"] });
        },
    });

    const deleteFlashcardMutation = useMutation({
        mutationFn: async (id: string) => {
            const flashcardRef = doc(db, "flashcards", id);
            await deleteDoc(flashcardRef);
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ["flashcards"] });
        },
    });
      
      
    // Combine loading states
    const isLoading = isCategoriesLoading || isFlashcardsLoading;

    // Optionally handle errors here or inside your components
    if (isCategoriesError) {
        console.error("Error fetching categories:", categoriesError);
    }
    if (isFlashcardsError) {
        console.error("Error fetching flashcards:", flashcardsError);
    }

    // Simple helper
    const getFlashcardsByCategory = (categoryId: string): Flashcard[] => {
        return (flashcards as Flashcard[]).filter(
            (flashcard) => flashcard.categoryId === categoryId
        );
    };

    // Prepare context value
    const contextValue = useMemo(
        () => ({
            categories,
            flashcards,
            isLoading,
            getFlashcardsByCategory,
            editCategory: editCategoryMutation.mutate,
            editFlashcard: editFlashcardMutation.mutate,
            deleteCategory: deleteCategoryMutation.mutate,
            deleteFlashcard: deleteFlashcardMutation.mutate,
            addCategory: addCategoryMutation.mutate,
            addFlashcard: addFlashcardMutation.mutate,
        }),
        [
            categories,
            flashcards,
            isLoading,
            editCategoryMutation.mutate,
            editFlashcardMutation.mutate,
            deleteCategoryMutation.mutate,
            deleteFlashcardMutation.mutate,
            addCategoryMutation.mutate,
            addFlashcardMutation.mutate,
        ]
    );

    return (
        <FlashcardsContext.Provider value={contextValue}>
            {children}
        </FlashcardsContext.Provider>
    );
};