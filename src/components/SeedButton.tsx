import { collection, addDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import flashcardData from "../data/flashcard-data";

export default function SeedButton() {
  const seedFirestore = async () => {
    try {
      console.log("Seeding Database");
      for (const category of flashcardData) {
        const { category: name, description, flashcards } = category;

        const categoryDoc = await addDoc(collection(db, "categories"), {
          name,
          description,
        });

        const categoryId = categoryDoc.id;

        for (const card of flashcards) {
          await addDoc(collection(db, "flashcards"), {
            categoryId,
            front: card.front,
            back: card.back,
          });
        }
      }

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
        console.log("Button clicked");
        void seedFirestore();
      }}
      className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer"
    >
      Seed Firestore
    </button>
  );
}
