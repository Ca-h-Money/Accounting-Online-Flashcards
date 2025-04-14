import { useAuth } from "../context/auth/useAuthContext";
import LoginForm from "../components/LoginForm";

export default function AdminPage() {
    const { currentUser } = useAuth();

    if (!currentUser) return <LoginForm />;

    return (
        <div className="p-4">
        <h1 className="text-2xl font-bold text-black dark:text-white">Admin Panel</h1>
        <p className="text-black dark:text-white">This is the hidden admin page for managing flashcards.</p>
        </div>
    );
}
