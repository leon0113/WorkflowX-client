import Header from '@/components/Header';
import TaskCard from '@/components/TaskCard';
import { useGetTasksQuery } from '@/state/api';
import { Task } from '@/types';
import React from 'react'

type Props = {
    id: string;
    setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const ListView = ({ id, setIsModalNewTaskOpen }: Props) => {

    const { data: tasks, error, isLoading } = useGetTasksQuery({ projectId: Number(id) });




    if (isLoading) return <div>Loading.....</div>
    if (error) return <div>Sorry, An Error occurred.</div>

    return (
        <div className='md:pl-10 pb-8 px-5 lg:px-10'>
            <div className="pt-5">
                <Header name="List" buttonComponent={
                    <button
                        className='flex items-center bg-blue-primary px-3 py-2 text-white hover:bg-blue-600'
                        onClick={() => setIsModalNewTaskOpen(true)}
                    >
                        Add Task
                    </button>
                }
                    isSmallText
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {
                    tasks && tasks?.map((task: Task) => (
                        <TaskCard key={task.id} task={task} />
                    ))
                }
            </div>
        </div>
    )
}

export default ListView