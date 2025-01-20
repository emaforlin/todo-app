import { auth } from '@/auth'
import TaskForm from '@/components/TaskForm'
import TaskList from '@/components/TaskList'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

const Tasks = async () => {
    const session = await auth()
    return (
        <>
            <SessionProvider session={session}>
                <TaskForm />
                <TaskList />
            </SessionProvider>
        </>
    )
}

export default Tasks