import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import flashcardData from "../data/flashcard-data";

export default function SeedButton() {
  const seedFirestore = async () => {
    try {
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

      alert("Seeded successfully");
    } catch (err) {
      console.error("Seeding failed", err);
    }
  };

  return (
    <button
      onClick={() => void seedFirestore}
      className="px-4 py-2 bg-green-600 text-white rounded"
    >
      Seed Firestore
    </button>
  );
}
