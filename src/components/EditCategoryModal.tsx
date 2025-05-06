// components/EditCategoryModal.tsx
import { useState, useEffect } from "react";
import { Category } from "../context/flashcards/flashcardsContext";
import { useFlashcards } from "../context/flashcards/useFlashcards";
import Button from "./Button";

type EditCategoryModalProps = {
    category: Category | null;
    onClose: () => void;
};

export default function EditCategoryModal({ category, onClose }: EditCategoryModalProps) {
    const { editCategory, addCategory } = useFlashcards();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const isEditing = !!category?.id;

    useEffect(() => {
        if (category) {
            setName(category.name);
            setDescription(category.description);
        }
    }, [category]);

    const onSubmit = () => {
        if (!category) return;

        if (isEditing) {
            editCategory({ id: category.id, updates: { name, description } });
          } else {
            addCategory({ name, description });
          }

        onClose();
    };

    if (!category) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-md shadow-lg text-black dark:text-white">
                <h2 className="text-xl font-semibold mb-4">{`${isEditing ? "Edit" : "Add"} Category`}</h2>
                <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1 text-left">Name</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-800"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 text-left">Description</label>
                    <textarea
                        className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-800"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                    />
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
