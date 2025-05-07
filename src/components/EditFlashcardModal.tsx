import { useState, useEffect } from "react";
import { Flashcard, Category } from "../context/flashcards/flashcardsContext";
import { useFlashcards } from "../context/flashcards/useFlashcards";
import Button from "./Button";

type EditFlashcardModalProps = {
    flashcard: Flashcard | null;
    categories: Category[];
    activeCategoryId: string;
    onClose: () => void;
};

export default function EditFlashcardModal({
    flashcard,
    categories,
    activeCategoryId,
    onClose,
}: EditFlashcardModalProps) {
    const { editFlashcard, addFlashcard } = useFlashcards();

    const [front, setFront] = useState("");
    const [useTChart, setUseTChart] = useState(false);
    const [back, setBack] = useState("");
    const [debit, setDebit] = useState("");
    const [credit, setCredit] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [imgSrc, setImgSrc] = useState("");
    const [imgValid, setImgValid] = useState(true);

    const isEditing = !!flashcard?.id;

    useEffect(() => {
        if (flashcard) {
            setBack("");
            setDebit("");
            setCredit("");
            setImgSrc("");
            setFront(flashcard.front);
            setCategoryId(flashcard.categoryId);
            setImgValid(true);

            if(activeCategoryId != ""){
                setCategoryId(activeCategoryId);
            }else{
                setCategoryId(flashcard.categoryId);
            }

            if (flashcard.back.length === 2) {
                setUseTChart(true);
                setDebit(flashcard.back[0]);
                setCredit(flashcard.back[1]);
            } else {
                setUseTChart(false);
                setBack(flashcard.back[0] || "");
            }

            if (flashcard.imgSrc){
                setImgSrc(flashcard.imgSrc);
            }
        }
    }, [flashcard]);

    useEffect(() => {
        setImgValid(true);
    }, [imgSrc])

    const onSubmit = () => {
        const trimmedFront = front.trim();

        const trimmedBackArray = useTChart
            ? [debit.trim(), credit.trim()]
            : [back.trim()];

        if (isEditing && flashcard) {
            editFlashcard({
                id: flashcard.id,
                categoryId: flashcard.categoryId,
                front: trimmedFront,
                back: trimmedBackArray,
                imgSrc: imgSrc
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
                    {/* Category at the top */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-left">Category</label>
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

                    {/* Front Section */}
                    <div className="mt-6">
                        <hr className="border-gray-500 dark:border-gray-700"/>
                        <h3 className="text-md font-semibold my-2">Front</h3>
                        
                        <div className="mt-3">
                            <label className="block text-sm font-medium mb-1 text-left">Front Text</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-800"
                                value={front}
                                onChange={(e) => setFront(e.target.value)}
                            />
                        </div>
                    </div>

                    

                    {/* Back Section */}
                    <div className="mt-6">
                        <hr className="border-gray-500 dark:border-gray-700" />
                        <div className="flex items-center justify-between my-2">
                            <div className="flex-1"></div>
                            <h3 className="flex-1 text-md font-semibold">Back</h3>
                            
                            <div className="flex flex-1 items-center justify-end space-x-2">
                                <input
                                    id="useTChart"
                                    type="checkbox"
                                    checked={useTChart}
                                    onChange={(e) => setUseTChart(e.target.checked)}
                                />
                                <label htmlFor="useTChart" className="text-sm font-medium">T-Chart</label>
                                
                            </div>
                        </div>
                        
                        {useTChart ? (
                            <>
                                <div className="mt-3">
                                    <label className="block text-sm font-medium mb-1 text-left">Debit Text</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-800"
                                        value={debit}
                                        onChange={(e) => setDebit(e.target.value)}
                                    />
                                </div>
                                <div className="mt-3">
                                    <label className="block text-sm font-medium mb-1 text-left">Credit Text</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-800"
                                        value={credit}
                                        onChange={(e) => setCredit(e.target.value)}
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="mt-3">
                                <label className="block text-sm font-medium mb-1 text-left">Back Text</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-800"
                                    value={back}
                                    onChange={(e) => setBack(e.target.value)}
                                />
                            </div>
                        )}
                    </div>

                    {/* Image Section */}
                    <div className="mt-6">
                        <hr className="border-gray-500 dark:border-gray-700"/>
                        <h3 className="text-md font-semibold my-2">Image</h3>
                        <div className="flex justify-center">
                            {imgSrc !== "" && imgValid ? (
                                <img
                                    src={imgSrc}
                                    alt="Card visual"
                                    className="flex-1 max-w-full max-h-30 object-contain"
                                    onError={() => setImgValid(false)}
                                />
                            ) : (
                                <div className="text-sm text-gray-500 italic">Image unavailable</div>
                            )}
                        </div>
                        
                        <div className="mt-3">
                            <label className="block text-sm font-medium mb-1 text-left">Image URL</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-800"
                                value={imgSrc}
                                onChange={(e) => setImgSrc(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-2 pt-2">
                        <Button
                            aria-label="Cancel Button"
                            title="Cancel"
                            onClick={onClose}
                            className="!bg-red-500 dark:!bg-red-600 hover:!bg-red-600 dark:hover:!bg-red-700"
                        >
                            Cancel
                        </Button>
                        <Button
                            aria-label="Save Button"
                            title="Save"
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
