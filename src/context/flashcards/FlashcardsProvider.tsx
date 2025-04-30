import { ReactNode } from "react";
import { collection, getDoc, getDocs, updateDoc, deleteDoc, addDoc, doc, setDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "../../firebase";
import { Category, Flashcard } from "./flashcardsContext";
import { FlashcardsContext } from "./flashcardsContext";
import { getCachedFlashcards, saveFlashcardCache } from "../../utils/cache";
import { v4 as uuidv4 } from "uuid";

/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */


// ----- Firestore Meta Info Helpers -----

// Fetch 'updated_at' timestamp from the Firestore meta document
const fetchUpdatedAt = async (): Promise<string | null> => {
    const ref = doc(db, "meta", "globalData");
    const snap = await getDoc(ref);
    const data = snap.data();
    const ts = data?.updated_at as Timestamp | undefined;
    return ts?.toDate().toISOString() ?? null;
};

// Update the 'updated_at' field in Firestore meta document
const updateLastModified = async () => {
    const ref = doc(db, "meta", "globalData");
  
    await setDoc(ref, {
      updated_at: serverTimestamp(),
    }, { merge: true }); // this avoids overwrite and supports non-existing docs
};

// ----- Flashcard and Category Fetcher -----

// Fetch categories and flashcards from Firestore (or from local cache if up-to-date)
const fetchFlashcardsAndCategories = async (): Promise<{
    categories: Category[];
    flashcards: Flashcard[];
}> => {
    // Fetch timestamp from Firestore of last update
    const updatedAt = await fetchUpdatedAt();
    // Fetch cached data from local storage
    const cached = getCachedFlashcards();

    // If local cache is still valid, return it
    if (cached && updatedAt && cached.lastUpdated === updatedAt) {
        console.log("Loaded Data From Local Storage");
        return {
            categories: cached.categories,
            flashcards: cached.flashcards,
        };
    }

    // Otherwise fetch all categories from Firestore
    const catSnap = await getDocs(collection(db, "categories"));
    const categories = catSnap.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Category, "id">),
    })).sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

    // For each category, fetch associated flashcards
    const flashcardFetches = await Promise.all(
        categories.map(async (cat) => {
            const catDoc = doc(db, "flashcards", cat.id);
            const snap = await getDoc(catDoc);
            if (!snap.exists()) return [];
            const data = snap.data();
            const flashcardsObj = data?.flashcards ?? {};
            return (Object.values(flashcardsObj) as Flashcard[]).map((fc) => ({
                ...fc,
                categoryId: cat.id,
            }));
        })
    );

    const flashcards = flashcardFetches.flat().sort((a, b) =>
        a.front.toLowerCase().localeCompare(b.front.toLowerCase())
    );

    // Save to local cache
    if (updatedAt) {
        saveFlashcardCache({ categories, flashcards, lastUpdated: updatedAt });
    }

    console.log("Loaded Data From Database");
    return { categories, flashcards };
};

// ----- Provider Component -----

export const FlashcardsProvider = ({ children }: { children: ReactNode }) => {
    
    const queryClient = useQueryClient();

    const {
        data: loadedData = { categories: [], flashcards: [] },
        isLoading : isLoadingData,
        isError: isDataError,
        error: dataError,
      } = useQuery({
        queryKey: ["flashcards-and-categories"],
        queryFn: fetchFlashcardsAndCategories,
    });

    const categories = loadedData.categories;
    const flashcards = loadedData.flashcards;

    // ----- Category Mutations -----

    const addCategoryMutation = useMutation({
        mutationFn: async (newCategory: Omit<Category, "id">) => {
            await addDoc(collection(db, "categories"), newCategory);
            await updateLastModified();
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ["flashcards-and-categories"] });
        },
    });

    const editCategoryMutation = useMutation({
        mutationFn: async ({ id, updates }: { id: string; updates: Partial<Category> }) => {
            const categoryRef = doc(db, "categories", id);
            await updateDoc(categoryRef, updates);
            await updateLastModified();
        },
        onSuccess: () => {
            // Invalidate the "flashcards-and-categories" query so it refetches
            void queryClient.invalidateQueries({ queryKey: ["flashcards-and-categories"] });
        },
    });

    const deleteCategoryMutation = useMutation({
        mutationFn: async (id: string) => {
            const categoryRef = doc(db, "categories", id);
            await deleteDoc(categoryRef);
            await updateLastModified();
        },
        onSuccess: () => {
            // Invalidate the "flashcards-and-categories" query so it refetches
            void queryClient.invalidateQueries({ queryKey: ["flashcards-and-categories"] });
        },
    });

    // ----- Flashcard Mutations -----

    const addFlashcardMutation = useMutation({
        mutationFn: async (newFlashcard: Omit<Flashcard, "id">) => {
            // Create a new id for the flashcard and add to the flashcard
            const id = uuidv4();
            const flashcardWithId = { ...newFlashcard, id };
            // Find the reference for the flashcards using the categoryId
            const ref = doc(db, "flashcards", newFlashcard.categoryId);
            const snap = await getDoc(ref);
            // Get the pre existing flashcards if they exist already
            const current = snap.exists() ? snap.data()?.flashcards ?? {} : {};
            // Add the new flashcard to the pre existing flashcards
            await setDoc(ref, {
                categoryId: newFlashcard.categoryId,
                flashcards: { ...current, [id]: flashcardWithId },
            }, { merge: true });
            await updateLastModified();
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ["flashcards-and-categories"] });
        },
    });

    const editFlashcardMutation = useMutation({
        mutationFn: async (flashcard: Flashcard) => {
            const { id, categoryId, ...updates } = flashcard;

            // Find the reference for the flashcards using the categoryId
            const ref = doc(db, "flashcards", categoryId);
            const snap = await getDoc(ref);
            if (!snap.exists()) return;

            // Get the pre existing flashcards if they exist already
            const current = snap.data()?.flashcards ?? {};
            // Update the pre existing target flashcard using the id
            current[id] = { ...current[id], ...updates };
            // Update the flashcards document with the new data
            await updateDoc(ref, { flashcards: current });
            await updateLastModified();
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ["flashcards-and-categories"] });
        },
    });

    const deleteFlashcardMutation = useMutation({
        mutationFn: async (flashcard: Flashcard) => {
            const { id, categoryId } = flashcard;

            // Find the reference for the flashcards using the categoryId
            const ref = doc(db, "flashcards", categoryId);
            const snap = await getDoc(ref);
            if (!snap.exists()) return;
            // Get the pre existing flashcards if they exist already
            const current = snap.data()?.flashcards ?? {};
            // Delete the pre existing target flashcard using the id
            delete current[id];
            // Update the flashcards document with the new data
            await updateDoc(ref, { flashcards: current });
            await updateLastModified();
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ["flashcards-and-categories"] });
        },
    });

    // ----- Helper: Get flashcards by category ID -----
    const getFlashcardsByCategory = (categoryId: string): Flashcard[] => {
        return flashcards.filter(
            (flashcard) => flashcard.categoryId === categoryId
        );
    };

    return (
        <FlashcardsContext.Provider value={{
            categories,
            flashcards,
            isLoadingData,
            isDataError,
            dataError,
            getFlashcardsByCategory,
            editCategory: editCategoryMutation.mutate,
            editFlashcard: editFlashcardMutation.mutate,
            deleteCategory: deleteCategoryMutation.mutate,
            deleteFlashcard: deleteFlashcardMutation.mutate,
            addCategory: addCategoryMutation.mutate,
            addFlashcard: addFlashcardMutation.mutate,
        }}>
            {children}
        </FlashcardsContext.Provider>
    );
};