// components/EditFlashcardModal.tsx
import { useState, useEffect } from "react";
import { Flashcard, Category } from "../context/flashcards/flashcardsContext";
import { useFlashcards } from "../context/flashcards/useFlashcards";

type EditFlashcardModalProps = {
    flashcard: Flashcard | null;
    categories: Category[];
    onClose: () => void;
};

export default function EditFlashcardModal({
    flashcard,
    categories,
    onClose,
}: EditFlashcardModalProps) {
    const { editFlashcard, addFlashcard } = useFlashcards();
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");
    const [categoryId, setCategoryId] = useState("");

    const isEditing = !!flashcard?.id;

    useEffect(() => {
        if (flashcard) {
            setFront(flashcard.front);
            setBack(flashcard.back.join(", "));
            setCategoryId(flashcard.categoryId);
        }
    }, [flashcard]);

    const onSubmit = () => {
        if (!flashcard) return;

        if (isEditing) {
            editFlashcard({ id: flashcard.id,
                updates: {
                    front: front.trim(),
                    back: back.split(",").map((b) => b.trim()).filter((b) => b),
                    categoryId,
                }
            });
        } else {
            addFlashcard({ 
                front: front.trim(),
                back: back.split(",").map((b) => b.trim()).filter((b) => b),
                categoryId
            });
        }
        onClose();
    };

    if (!flashcard) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-md shadow-lg text-black dark:text-white">
            <h2 className="text-xl font-semibold mb-4">Edit Flashcard</h2>
            <div className="space-y-4">
                <div>
                <label className="block text-sm font-medium">Front</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-800"
                    value={front}
                    onChange={(e) => setFront(e.target.value)}
                />
                </div>
                <div>
                <label className="block text-sm font-medium">Back (comma-separated)</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-800"
                    value={back}
                    onChange={(e) => setBack(e.target.value)}
                />
                </div>
                <div>
                <label className="block text-sm font-medium">Category</label>
                <select
                    className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-800"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                >
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
                </div>
                <div className="flex justify-end gap-2">
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 rounded"
                >
                    Cancel
                </button>
                <button
                    onClick={onSubmit}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                    Save
                </button>
                </div>
            </div>
            </div>
        </div>
    );
}
