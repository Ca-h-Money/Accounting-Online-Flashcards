import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/auth/useAuthContext";
import Button from "./Button";

type LoginFormProps = {
  onSuccess?: () => void;
};

export default function LoginForm({ onSuccess }: LoginFormProps) {
    const { currentUser } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
        await signInWithEmailAndPassword(auth, email, password);
        if (onSuccess) onSuccess();
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Login failed");
            }
        }
    };

    if (currentUser) return null;

    return (
        <div className="p-4 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">Admin Login</h1>
        <form onSubmit={(e) => void handleLogin(e)} className="space-y-4">
            <div>
                <label className="text-sm font-medium text-black dark:text-white">Email</label>
                <input
                    type="email"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 text-black dark:text-white rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-black dark:text-white">Password</label>
                <input
                    type="password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 text-black dark:text-white rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {error && <p className="font-bold p-1 bg-red-500 text-sm text-black dark:text-white rounded">{error}</p>}

            <Button
                aria-label="Log In"
                title="Log In"
                className="h-full w-full !bg-green-500 dark:!bg-green-600 hover:!bg-green-600 dark:hover:!bg-green-700"
                type="submit"
            >
                Log In
            </Button>
        </form>
        </div>
    );
}
