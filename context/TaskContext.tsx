'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type Task = {
    id: number;
    title: string;
    dueDate: string;
    user: { id: number; name: string }
}

type TaskContextType = {
    tasks: Task[];
    fetchTasks: () => Promise<void>
    addTask: (task: Task) => void;
    removeTask: (id: number) => void
    updateTask: (id: number, updatedData: Partial<Omit<Task, 'id'>>) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const fetchTasks = async () => {
        try {
            const res = await fetch("/api/tasks")
            if (!res.ok) {
                throw new Error("Error fetching tasks")
            }
            const data = await res.json()
            setTasks(data)
        } catch (error) {
            console.error('Error fetching tasks: ', error)
        }
    }

    const addTask = (task: Task) => {
        setTasks((prevTasks) => [...prevTasks, task])
    }

    const removeTask = (id: number) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
    }

    const updateTask = async (id: number, updatedData: Partial<Omit<Task, 'id'>>) => {
        const res = await fetch(`/api/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
        });
        const updatedTask = await res.json();
        setTasks((prev) => prev.map((task) => (task.id === id ? updatedTask : task)));
    };

    useEffect(() => {
        fetchTasks()
    }, []);


    return (
        <TaskContext.Provider value={{ tasks, fetchTasks, addTask, removeTask, updateTask }}>
            {children}
        </TaskContext.Provider>
    )
}

export const useTaskContext = () => {
    const context = useContext(TaskContext)
    if (!context) {
        throw new Error("useTaskContext must be used within a TaskProvider");
    }
    return context
}