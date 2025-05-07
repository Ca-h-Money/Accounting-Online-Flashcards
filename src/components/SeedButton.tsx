import { collection, addDoc, doc, setDoc, serverTimestamp, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import flashcardData from "../data/flashcard-data";
import { v4 as uuidv4 } from "uuid";

/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

export default function SeedButton() {
    const seedFirestore = async () => {
        try {
            console.log("Seeding Database");

            // 1. DELETE all categories
            const categoriesSnapshot = await getDocs(collection(db, "categories"));
            const deleteCategoryPromises = categoriesSnapshot.docs.map((docSnap) =>
              deleteDoc(doc(db, "categories", docSnap.id))
            );
      
            // 2. DELETE all flashcards
            const flashcardsSnapshot = await getDocs(collection(db, "flashcards"));
            const deleteFlashcardsPromises = flashcardsSnapshot.docs.map((docSnap) =>
              deleteDoc(doc(db, "flashcards", docSnap.id))
            );
      
            // Wait for all deletes to finish
            await Promise.all([...deleteCategoryPromises, ...deleteFlashcardsPromises]);
      
            console.log("Deleted old categories and flashcards");
      
            for (const [index, category] of flashcardData.entries()) {
                const { category: name, description, flashcards } = category;

                // 3. Add the category to the 'categories' collection
                const categoryDoc = await addDoc(collection(db, "categories"), {
                    name,
                    description,
                    order: index,
                });

                const categoryId = categoryDoc.id;

                // 4. Build flashcards as a map { id: flashcard }
                const flashcardMap: Record<string, { id: string; front: string; back: string[] }> = {};

                for (const card of flashcards) {
                    const id = uuidv4(); // generate a UUID for each flashcard
                    flashcardMap[id] = {
                        id,
                        front: card.front,
                        back: card.back,
                    };
                }

                // 5. Save flashcards to a single document under the category id
                await setDoc(doc(db, "flashcards", categoryId), {
                    categoryId,
                    flashcards: flashcardMap,
                });
            }

            // 6. Update global timestamp
            const ref = doc(db, "meta", "globalData");              
            await setDoc(ref, {
                updated_at: serverTimestamp(),
            }, { merge: true }); // this avoids overwrite and supports non-existing docs

            alert("Seeded successfully");
        } catch (err) {
            console.error("Seeding failed", err);
        }
    };

    return (
        <button
            onClick={() => {
                void seedFirestore();
            }}
            className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer"
        >
            Seed Firestore
        </button>
    );
}
