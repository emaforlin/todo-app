'use client';

import { useTaskContext } from '@/context/TaskContext';
import { useState, useEffect } from 'react';

export default function TaskForm() {
    const { addTask } = useTaskContext()
    const [formData, setFormData] = useState({ title: "", dueDate: "", userId: "" })
    const [users, setUsers] = useState<Array<{ id: number, name: string }>>([]);

    useEffect(() => {
        fetch('/api/users')
            .then((res) => res.json())
            .then((data) => setUsers(data));
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const res = await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        const newTask = await res.json()
        addTask(newTask)
        setFormData({ title: "", dueDate: "", userId: "" })
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Crear Nueva Tarea</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Título"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
                <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    required
                    className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                    value={formData.userId}
                    onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                    required
                    className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="" disabled>
                        Selecciona un usuario
                    </option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Crear Tarea
                </button>
            </form>
        </div>
    );
}
