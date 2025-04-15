import { useState } from "react";
import { useAuth } from "../context/auth/useAuthContext";
import { useFlashcards } from "../context/flashcards/useFlashcards";
import LoginForm from "../components/LoginForm";
import EditCategoryModal from "../components/EditCategoryModal";
import EditFlashcardModal from "../components/EditFlashcardModal";
import { Category, Flashcard } from "../context/flashcards/flashcardsContext";
import Button from "../components/Button";

export default function AdminPage() {
    const { currentUser } = useAuth();
    const { categories, flashcards, deleteCategory, deleteFlashcard } = useFlashcards();

    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [editingFlashcard, setEditingFlashcard] = useState<Flashcard | null>(null);

    if (!currentUser) return <LoginForm />;

    const isCategoryInUse = (categoryId: string) =>
        flashcards.some((f) => f.categoryId === categoryId);

    const handleDeleteCategory = (categoryId: string) => {
        if (isCategoryInUse(categoryId)) {
            alert("This category is currently in use and cannot be deleted.");
        return;
        }

        if (confirm("Are you sure you want to delete this category?")) {
            deleteCategory(categoryId);
        }
    };

    const handleDeleteFlashcard = (flashcardId: string) => {
        if (confirm("Are you sure you want to delete this flashcard?")) {
            deleteFlashcard(flashcardId);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto text-black dark:text-white">
            <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

            {/* ---------- CATEGORIES ---------- */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Manage Categories</h2>
                <Button
                    onClick={() => setEditingCategory({ id: "", name: "", description: "" })}
                    className="mb-4 px-4 py-2 bg-green-600 hover:bg-green-700"
                >
                    + Add Category
                </Button>
                <ul className="space-y-3">
                {categories.map((cat) => (
                    <li
                    key={cat.id}
                    className="flex items-center justify-between border border-gray-300 dark:border-gray-700 rounded p-4"
                    >
                    <div>
                        <h3 className="text-start font-semibold">{cat.name}</h3>
                        <p className="text-start text-sm text-gray-600 dark:text-gray-400">{cat.description}</p>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            className="px-3 py-1"
                            onClick={() => setEditingCategory(cat)}
                        >
                            Edit
                        </Button>
                        <Button
                            className={`px-3 py-1 ${
                                isCategoryInUse(cat.id)
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-red-600 hover:bg-red-700"
                            }`}
                            onClick={() => handleDeleteCategory(cat.id)}
                            disabled={isCategoryInUse(cat.id)}
                        >
                            Delete
                        </Button>
                    </div>
                    </li>
                ))}
                </ul>
            </section>

            {/* ---------- FLASHCARDS ---------- */}
            <section>
                <h2 className="text-2xl font-semibold mb-4">Manage Flashcards</h2>
                <Button
                    onClick={() =>
                        setEditingFlashcard({
                        id: "",
                        categoryId: categories[0]?.id ?? "",
                        front: "",
                        back: [""],
                        })
                    }
                    className="mb-4 px-4 py-2 bg-green-600 hover:bg-green-700"
                >
                    + Add Flashcard
                </Button>
                {categories.map((cat) => {
                const cards = flashcards.filter((f) => f.categoryId === cat.id);
                return (
                    <div key={cat.id} className="mb-6">
                    <h3 className="text-xl font-bold mb-2">{cat.name}</h3>
                    {cards.length === 0 ? (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                        No flashcards in this category.
                        </p>
                    ) : (
                        <ul className="space-y-3">
                        {cards.map((card) => (
                            <li
                            key={card.id}
                            className="flex justify-between items-center border border-gray-300 dark:border-gray-700 p-3 rounded"
                            >
                            <div>
                                <p className="text-start font-medium">Front: {card.front}</p>
                                <p className="text-start text-sm text-gray-600 dark:text-gray-400">
                                Back: {card.back.join(", ")}
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700"
                                    onClick={() => setEditingFlashcard(card)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    className="px-3 py-1 bg-red-600 hover:bg-red-700"
                                    onClick={() => handleDeleteFlashcard(card.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                            </li>
                        ))}
                        </ul>
                    )}
                    </div>
                );
                })}
            </section>

            {/* ---------- MODALS ---------- */}
            <EditCategoryModal
                category={editingCategory}
                onClose={() => setEditingCategory(null)}
            />
            <EditFlashcardModal
                flashcard={editingFlashcard}
                categories={categories}
                onClose={() => setEditingFlashcard(null)}
            />
        </div>
    );
}
