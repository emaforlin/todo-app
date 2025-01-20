import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-4">
      <section className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Create Your Tasks</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Organize your tasks efficiently and never miss a deadline. Sign in to start adding your tasks and manage them effectively.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          With our to-do list application, you can:
        </p>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
          <li>Create and manage tasks</li>
          <li>Set deadlines and reminders</li>
          <li>Track your progress</li>
          <li>Collaborate with others</li>
        </ul>
      </section>
    </main>
  );
}