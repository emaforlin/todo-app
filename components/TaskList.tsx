'use client';

import { useTaskContext } from '@/context/TaskContext';
import { useSession } from 'next-auth/react';

export default function TaskList() {
    const { data: session }: any = useSession()
    const { tasks, removeTask } = useTaskContext()

    const handleDelete = async (id: number) => {
        await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
        removeTask(id)
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Lista de Tareas</h2>
            <div className="space-y-4">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className="flex items-center justify-between bg-gray-100 p-4 rounded-md shadow-sm"
                    >
                        <div>
                            <p className="text-lg font-medium text-gray-800">{task.title}</p>
                            <p className="text-sm text-gray-600">Asignado a: {task.user.name}</p>
                        </div>
                        {session?.user?.role === "ADMIN" &&
                            (
                                <button
                                    onClick={() => handleDelete(task.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200"
                                >
                                    Eliminar
                                </button>
                            )
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}
