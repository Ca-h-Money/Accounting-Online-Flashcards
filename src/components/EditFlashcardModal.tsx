// components/EditFlashcardModal.tsx
import { useState, useEffect } from "react";
import { Flashcard, Category } from "../context/flashcards/flashcardsContext";
import { useFlashcards } from "../context/flashcards/useFlashcards";
import Button from "./Button";

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
        const trimmedFront = front.trim();
        const trimmedBackArray = back.split(",").map((b) => b.trim()).filter((b) => b);
    
        if (isEditing && flashcard) {
            editFlashcard({
                id: flashcard.id,
                categoryId: flashcard.categoryId,
                front: trimmedFront,
                back: trimmedBackArray,
            });
        } else {
            addFlashcard({
                front: trimmedFront,
                back: trimmedBackArray,
                categoryId,
            });
        }
    
        onClose();
    };

    if (!flashcard) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-md shadow-lg text-black dark:text-white">
            <h2 className="text-xl font-semibold mb-4">{`${isEditing ? "Edit" : "Add"} Flashcard`}</h2>
            <div className="space-y-4">
                <div>
                <label className="block text-sm font-medium mb-1">Front Text</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-800"
                    value={front}
                    onChange={(e) => setFront(e.target.value)}
                />
                </div>
                <div>
                <label className="block text-sm font-medium mb-1">Back Text(comma-separated)</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-800"
                    value={back}
                    onChange={(e) => setBack(e.target.value)}
                />
                </div>
                <div>
                <label className="block text-sm font-medium mb-1">Category</label>
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
                    <Button
                        aria-label={`Cancel Button`}
                        title={`Cancel`}
                        onClick={onClose}
                        className="!bg-red-500 dark:!bg-red-600 hover:!bg-red-600 dark:hover:!bg-red-700"
                    >
                        Cancel
                    </Button>
                    <Button
                        aria-label={`Save Button`}
                        title={`Save`}
                        onClick={onSubmit}
                        className="!bg-green-500 dark:!bg-green-600 hover:!bg-green-600 dark:hover:!bg-green-700"
                    >
                        Save
                    </Button>
                </div>
            </div>
            </div>
        </div>
    );
}
