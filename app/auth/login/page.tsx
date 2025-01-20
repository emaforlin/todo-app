"use client"

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GithubSignIn from "@/components/auth/GithubSignIn";

export default function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (!res || res.error) {
            setError(res?.error || "Invalid credentials");
        } else {
            router.push("/tasks");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col justify-center items-center">
            <header className="bg-purple-600 dark:bg-purple-800 w-full py-6">
                <h1 className="text-white text-3xl text-center font-bold">Sign In</h1>
            </header>
            <main className="flex-grow flex flex-col justify-center items-center px-4">
                <section className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Sign In</h2>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-gray-100"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-gray-700 dark:text-gray-300">Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-gray-100"
                            />
                        </div>
                        <button type="submit" className="w-full bg-purple-600 dark:bg-purple-700 text-white py-2 rounded-md hover:bg-purple-700 dark:hover:bg-purple-800">Sign In</button>
                    </form>
                    <p className="text-gray-700 dark:text-gray-300 mt-4 text-center">
                        Don't have an account? <Link href="/auth/register" className="dark:hover:text-gray-400">Register here</Link>
                    </p>
                </section>
                <br />
                <section className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Sign in with Github</h2>
                    <form action={async () => {
                        await signIn("github", { redirectTo: "/tasks" })
                    }}>
                        <button type="submit" className="w-full bg-purple-600 dark:bg-purple-700 px-3 text-white py-2 rounded-md text-center hover:bg-purple-700 dark:hover:bg-purple-800">
                            Sign in with Github
                        </button>
                    </form>
                </section>
            </main>
            <footer className="bg-gray-800 dark:bg-gray-900 w-full py-4">
                <p className="text-center text-white">© 2023 To-Do List. All rights reserved.</p>
            </footer>
        </div>
    );
}
