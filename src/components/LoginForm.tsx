import { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../firebase";
import { useAuth } from "../context/auth/useAuthContext";
import Button from "./Button";

/**
 * LoginForm Component
 * 
 * This component handles admin authentication for the application.
 * It allows the user to either:
 * - Log in with email and password
 * - Request a password reset email if they forgot their password
 * 
 * Features:
 * - Email/password login with Firebase Authentication
 * - Forgot Password flow using Firebase `sendPasswordResetEmail`
 * - Form validation and error handling with friendly user messages
 * - Accessible buttons with aria-labels and titles
 * - Dark mode and light mode support for input fields and messages
 * 
 * Props:
 * - onSuccess?: () => void
 *    - An optional callback triggered after successful login
 * 
 * State:
 * - email: string — the email entered by the user
 * - password: string — the password entered by the user
 * - error: string — current error message to display, if any
 * - showPassReset: boolean — toggle to switch between login and password reset forms
 * 
 * Firebase Integration:
 * - signInWithEmailAndPassword(auth, email, password)
 * - sendPasswordResetEmail(auth, email)
 * 
 * Error Handling:
 * - Friendly, mapped error messages based on Firebase error codes
 * - Validation ensures user does not see raw Firebase error strings
 * 
 * Notes:
 * - If the user is already logged in (currentUser exists), this component renders nothing.
 * - After a successful password reset request, an alert confirms that an email was sent (regardless of whether the email exists).
 * - No direct Firebase errors are shown to the user; they are mapped into custom, non-technical messages.
 */

type LoginFormProps = {
    onSuccess?: () => void;
};

export default function LoginForm({ onSuccess }: LoginFormProps) {
    const { currentUser } = useAuth();
    const [showPassReset, setShowPassReset] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Handle user login attempt with Firebase Auth
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await signInWithEmailAndPassword(auth, email, password);
            if (onSuccess) onSuccess();
        } catch (err) {
            setError(getAuthErrorMessage(err));
        }
    };

    // Toggle the forgot password form
    const handleForgotPassword = (showReset: boolean) => {
        setError("");
        setPassword("");
        setShowPassReset(showReset);
    }

    // Handle sending password reset email via Firebase
    const handleRequestPasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await sendPasswordResetEmail(auth, email);
            alert("If an account exists with this email, a password reset email has been sent.");
        } catch (err) {
            setError(getAuthErrorMessage(err));
        }
    };

    // Map Firebase error codes to friendly custom messages
    const getAuthErrorMessage = (error: unknown): string => {
        if (error instanceof FirebaseError) {
            switch (error.code) {
                case "auth/invalid-email":
                    return "The email address is not valid.";
                case "auth/user-not-found":
                    return "No user found with this email.";
                case "auth/invalid-credential":
                    return "Incorrect email or password.";
                case "auth/missing-password":
                    return "Please enter a password.";
                case "auth/too-many-requests":
                    return "Too many attempts. Please try again later.";
                default:
                    return "An unknown error occurred. Please try again.";
            }
        }
        return "An unexpected error occurred. Please try again.";
    };

    if (currentUser) return null;

    if (showPassReset){
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md mt-20 mx-4 md:mx-auto">
                <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">Reset Password</h1>
                <form onSubmit={(e) => void handleRequestPasswordReset(e)} className="space-y-6">
                    {/* Email Field with "Back to Login" link */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-black dark:text-white ml-1 mr-auto">
                                Email
                            </label>
                        <input
                            type="email"
                            aria-label="email"
                            className="mt-1 w-full px-3 py-2 border border-2 border-gray-400 text-black dark:text-white rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <p className="font-bold p-1 bg-red-500 text-sm text-black dark:text-white rounded">
                            {error}
                        </p>
                    )}

                    {/* Submit Button */}
                    <Button
                        aria-label="Send Reset Code Button"
                        title="Send Reset Code"
                        className="w-full !bg-green-500 dark:!bg-green-600 hover:!bg-green-600 dark:hover:!bg-green-700"
                        type="submit"
                        >
                        Send Reset Code
                    </Button>
                    
                </form>
                <Button
                        aria-label="Back to Login Button"
                        title="Back to Log In"
                        className="w-full mt-4 !bg-red-400 dark:!bg-red-500 hover:!bg-red-500 dark:hover:!bg-red-600"
                        onClick={() => handleForgotPassword(false)}
                    >
                        Back to Login
                </Button>
            </div>
        )
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md mt-20 mx-4 md:mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">Admin Login</h1>
            <form onSubmit={(e) => void handleLogin(e)} className="space-y-6">
                {/* Email Field */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-black dark:text-white ml-1 mr-auto">
                        Email
                    </label>
                    <input
                        type="email"
                        aria-label="Back to Login Button"
                        className="mt-1 w-full px-3 py-2 border border-2 border-gray-400 text-black dark:text-white rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Password Field with Forgot Password Link */}
                <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-black dark:text-white ml-1">
                            Password
                        </label>
                        <button
                            type="button"
                            aria-label="password"
                            onClick={() => handleForgotPassword(true)}
                            className="cursor-pointer text-sm text-blue-600 dark:text-blue-400 hover:underline focus:outline-none"
                        >
                            Forgot Password?
                        </button>
                    </div>
                    <input
                        type="password"
                        aria-label="password"
                        className="mt-1 block w-full px-3 py-2 border border-2 border-gray-400 text-black dark:text-white rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Error Message */}
                {error && (
                    <p className="font-bold p-1 bg-red-500 text-sm text-black dark:text-white rounded">
                        {error}
                    </p>
                )}

                {/* Submit Button */}
                <Button
                    aria-label="Log In Button"
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
