import { useState } from "react";
import { useAuth } from "../context/auth/useAuthContext";
import { useFlashcards } from "../context/flashcards/useFlashcards";
import LoginForm from "../components/LoginForm";
import EditCategoryModal from "../components/EditCategoryModal";
import EditFlashcardModal from "../components/EditFlashcardModal";
import { Category, Flashcard } from "../context/flashcards/flashcardsContext";
import Button from "../components/Button";
import {useEffect} from "react";
import Dropdown from "../components/Dropdown";

//How many flashcards to display at a time
const ITEMS_PER_PAGE = 5;
const PAGE_WINDOW = 5;

const AdminPage = () => {
    const { currentUser } = useAuth();
    const { categories, flashcards, deleteCategory, deleteFlashcard } = useFlashcards();

    const [activeCategoryId, setActiveCategoryId] = useState("");
    const [ currentPage, setCurrentPage] = useState(1);

    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [editingFlashcard, setEditingFlashcard] = useState<Flashcard | null>(null);

    const [selectedIndex, setSelectedIndex] = useState(0);

    //sync selectedindex when activecategoryid changes
    useEffect(() => {
      const index = categories.findIndex((c) => c.id === activeCategoryId);
      if(index !== -1 && index !== selectedIndex){
        setSelectedIndex(index);
      }
    }, [activeCategoryId, categories]);

    //sync active categoryid when selectedindex changes
    useEffect(() => {
      if(selectedIndex >= 0 && selectedIndex < categories.length){
        const selected = categories[selectedIndex];
        if(selected.id !== activeCategoryId){
            setActiveCategoryId(selected.id);
            setCurrentPage(1);
        }
      }
    }, [selectedIndex, categories]);

    // SHow the login form if no admin is signed in
    if (!currentUser) return <LoginForm />;

    // Check if a category is being used in any flashcard
    const isCategoryInUse = (categoryId: string) => {
        return flashcards.some((flashcard) => flashcard.categoryId === categoryId);
    }
        
    // Only allow category deletion if it's not being used by a flashcard
    const handleDeleteCategory = (category: Category) => {
        if (isCategoryInUse(category.id)) {
            alert("This category is currently in use and cannot be deleted.");
            return;
        }

        if (confirm(`Are you sure you want to delete the category ${category.name}?`)) {
            deleteCategory(category.id);
        }
    };

    const handleDeleteFlashcard = (flashcard: Flashcard) => {
        if (confirm(`Are you sure you want to delete the flashcard ${flashcard.front}?`)) {
            deleteFlashcard(flashcard);
        }
      };
    //filter flashcards by active category
    const filteredFlashcards = flashcards.filter(card => card.categoryId === activeCategoryId);

    //pagination logic
    const totalPages = Math.ceil(filteredFlashcards.length / ITEMS_PER_PAGE);
    const paginatedFlashcards = filteredFlashcards.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages){
            setCurrentPage(page);
        }
    };
    const getPageNumbers = () => {
      const pages = [];
      let startPage = Math.max(1, currentPage - Math.floor(PAGE_WINDOW / 2));
      let endPage = startPage + PAGE_WINDOW -1;

      if(endPage > totalPages){
        endPage = totalPages;
        startPage = Math.max(1, endPage - PAGE_WINDOW + 1);
      }

      for(let i = startPage; i <= endPage; i++){
        pages.push(i);
      }
      return pages;
    }
    const pageNumbers = getPageNumbers();


    return (
        <div className="p-6 max-w-4xl mx-auto text-black dark:text-white">
            <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
            {/* ---------- CATEGORIES ---------- */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Manage Categories</h2>
                <Button
                    aria-label={`Add Category Button`}
                    title={`Add New Category`}
                    onClick={() => setEditingCategory({ id: "", name: "", description: "" })}
                    className="mb-4 px-4 py-2 !bg-green-500 dark:!bg-green-600 hover:!bg-green-600 dark:hover:!bg-green-700"
                >
                    + Add Category
                </Button>
       

                <ul className="space-y-3">
                    {categories.map((category) => (
                        <li
                            key={category.id}
                            className="flex items-center justify-between border border-gray-300 dark:border-gray-700 rounded p-4"
                        >
                            <div>
                                <h3 className="text-start font-semibold">{category.name}</h3>
                                <p className="text-start text-sm text-gray-600 dark:text-gray-400">{category.description}</p>
                            </div>

                            <div className="flex gap-2 sm:flex-row flex-col">
                                <Button
                                    aria-label={`Edit Category Button For ${category.name}`}
                                    title={`Edit Category For ${category.name}`}
                                    className="!bg-green-500 dark:!bg-green-600 hover:!bg-green-600 dark:hover:!bg-green-700"
                                    onClick={() => setEditingCategory(category)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    aria-label={`Delete Category Button For ${category.name}`}
                                    title={`Delete Category For ${category.name}`}
                                    className="!bg-red-500 dark:!bg-red-600 hover:!bg-red-600 dark:hover:!bg-red-700"
                                    onClick={() => handleDeleteCategory(category)}
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
                <h2 className="text-2xl font-semibold mb-0">Manage Flashcards</h2>
                <div className="flex flex-row flex-wrap items-center justify-start space-x-4">
                <Button
                    aria-label={`Add Flashcard Button`}
                    title={`Add Flashcard Category`}
                    onClick={() =>
                        setEditingFlashcard({
                            id: "",
                            categoryId: categories[0]?.id ?? "",
                            front: "",
                            back: [""],
                        })
                    }
                    className="mx-auto px-4 py-2 !bg-green-500 dark:!bg-green-600 hover:!bg-green-600 dark:hover:!bg-green-700"
                >
                    + Add Flashcard
                </Button>
               
                  
                <Dropdown
                        id="category-dropdown"
                        title="Select a Category"
                        options={categories.map((c) => c.name)}
                        selectedIndex={selectedIndex}
                        setSelectedIndex={setSelectedIndex}
                        ariaLabel="Category Selector"
                        />
                    
                 </div>             
        {/* Table with Flashcards */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Front</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left w-1/4">Back</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left w-0 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedFlashcards.map(card => (
                <tr
                  key={card.id}
                  className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800"
                >
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{card.front}</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{card.back.join(", ")}</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    <div className="flex gap-2 sm:flex-row flex-col">
                      <Button
                        aria-label={`Edit Flashcard Button For ${card.front}`}
                        title={`Edit Flashcard For ${card.front}`}
                        className="!bg-green-500 dark:!bg-green-600 hover:!bg-green-600 dark:hover:!bg-green-700"
                        onClick={() => setEditingFlashcard(card)}
                      >
                        Edit
                      </Button>
                      <Button
                        aria-label={`Delete Flashcard Button For ${card.front}`}
                        title={`Delete Flashcard For ${card.front}`}
                        className="!bg-red-500 dark:!bg-red-600 hover:!bg-red-600 dark:hover:!bg-red-700"
                        onClick={() => handleDeleteFlashcard(card)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
              
          {/* Pagination */}
          <div className="mt-4 flex justify-center gap-2">
            <button
            className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled = {currentPage === 1}
            aria-label="Previous page"
            >
              Prev
            </button>
            {pageNumbers.map((page) =>(
              <button
              aria-label={`Page ${page}`}
              title={`Page ${page}`}
              key={page}
              className={`px-3 py-1 border rounded cursor-pointer ${
                page === currentPage ? "bg-green-500 text-white" : ""
              }`}
              onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
              <button
              className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
              onClick={() => handlePageChange (currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              >
                Next
              </button>
        </div>
      </div>
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
};

export default AdminPage;
