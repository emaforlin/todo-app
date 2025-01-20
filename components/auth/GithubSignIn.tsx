"use server"

import { signIn } from "@/auth"

export default async function GithubSignIn() {
    return (
        <form
            action={async () => {
                await signIn("github", { redirectTo: "/tasks" })
            }}
        >
            <button type="submit" className="w-full bg-purple-600 dark:bg-purple-700 px-3 text-white py-2 rounded-md text-center hover:bg-purple-700 dark:hover:bg-purple-800">
                Signin with GitHub
            </button>
        </form>
    )
} 