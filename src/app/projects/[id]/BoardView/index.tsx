import { useGetTasksQuery, useUpdateTaskStatusMutation } from '@/state/api';
import { Task as TaskType } from '@/types';
import clsx from 'clsx';
import { EllipsisVertical, Plus } from 'lucide-react';
import { format } from 'date-fns';
import React from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import Image from 'next/image';

type Props = {
    id: string;
    setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const TaskStatus = ["To Do", "Work In Progress", "Under Review", "Completed"];

const BoardView = ({ id, setIsModalNewTaskOpen }: Props) => {
    const { data: tasks, isLoading, error } = useGetTasksQuery({ projectId: Number(id) });
    const [updateTaskStatus] = useUpdateTaskStatusMutation();

    const moveTask = (taskId: number, toStatus: string) => {
        updateTaskStatus({ taskId, status: toStatus });
    };

    if (isLoading) return <div>Loading.....</div>
    if (error) return <div>Sorry, An Error occurred.</div>

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4 pl-10">
                {
                    TaskStatus.map((status) => (
                        <TaskColumn
                            key={status}
                            status={status}
                            tasks={tasks || []}
                            moveTask={moveTask}
                            setIsModalNewTaskOpen={setIsModalNewTaskOpen}
                        />
                    ))
                }
            </div>
        </DndProvider>
    )
};

type TaskColumnProps = {
    status: string,
    tasks: TaskType[],
    moveTask: (taskId: number, toStatus: string) => void;
    setIsModalNewTaskOpen: (isOpen: boolean) => void;
}

const TaskColumn = ({ status, tasks, moveTask, setIsModalNewTaskOpen }: TaskColumnProps) => {

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item: { id: number }) => moveTask(item.id, status),
        collect: (monitor: any) => ({
            isOver: !!monitor.isOver()
        })
    }));

    const tasksCount = tasks.filter((task) => task.status === status).length;
    const statusColor: any = {
        "To Do": "#2563EB",
        "Work In Progress": "#059669",
        "Under Review": "#f3f70d",
        Completed: "#000000",
    };

    return (
        <div
            ref={(instance) => {
                drop(instance)
            }}
            className={clsx("sm:py-4 py-2 xl:px-2 rounded-lg", isOver ? "bg-blue-200 dark:bg-neutral-950" : "")}
        >
            <div className='mb-3 flex w-full'>
                <div
                    className={`w-2 !bg-[${statusColor[status]}] rounded-s-lg`}
                    style={{ backgroundColor: statusColor[status] }}
                />

                <div className="flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4 dark:bg-dark-secondary">
                    <h3 className='flex items-center text-lg font-semibold dark:text-white'>{status}{" "}
                        <span className='ml-2 w-6 h-6 inline-block rounded-full bg-gray-200 p-1 text-center text-sm leading-none dark:bg-dark-tertiary '>{tasksCount}</span>
                    </h3>
                    <div className="flex items-center gap-1">
                        <button className='flex h-6 w-5 items-center justify-center dark:text-neutral-500'>
                            <EllipsisVertical size={26} />
                        </button>
                        <button
                            className='flex size-6 items-center justify-center rounded bg-gray-200 dark:bg-dark-tertiary dark:text-white'
                            onClick={() => { setIsModalNewTaskOpen(true) }}
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {
                tasks.filter((task) => task.status === status).map((task) => (
                    <Task
                        key={task.id}
                        task={task}
                    />
                ))
            }
        </div>
    )
};

type TaskProps = {
    task: TaskType
}

const Task = ({ task }: TaskProps) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: { id: task.id },
        collect: (monitor: any) => ({
            isDragging: !!monitor.isDragging()
        })
    }));

    const taskTagsSplit = task.tags ? task.tags.split(",") : [];
    const formattedStartDate = task.startDate ? format(new Date(task.startDate), "P") : "";
    const formattedDueDate = task.dueDate ? format(new Date(task.dueDate), "P") : "";
    const numOfComments = (task.comments && task.comments.length) || 0;
    const PriorityTag = ({ priority }: { priority: TaskType['priority'] }) => {
        return (
            <div className={clsx("rounded-full px-2 py-1 text-xs font-semibold", priority === "Urgent" ? "bg-red-200 text-red-600" : priority === "High" ? "bg-yellow-200 text-yellow-600" : priority === 'Medium' ? "bg-green-200 text-green-600" : priority === 'Low' ? "bg-blue-200 text-blue-600" : "bg-gray-200 text-gray-600")}>
                {priority}
            </div>
        );
    }


    return (
        <div
            ref={(instance) => {
                drag(instance)
            }}
            className={clsx('mb-4 rounded-md bg-white shadow dark:bg-dark-secondary', isDragging ? "opacity-50" : "opacity-100")}
        >
            {
                task.attachments && task.attachments.length > 0 && (
                    <Image
                        src={`/${task.attachments[0].fileURL}`}
                        alt={task.attachments[0].fileName as string}
                        width={400}
                        height={200}
                        className='h-auto w-full rounded-t-md'
                    />
                )
            }

            <div className='p-4 md:p-6'>
                <div className="flex items-start justify-between">
                    <div className="flex flex-1 flex-wrap items-center gap-2">
                        {
                            task.priority && <PriorityTag priority={task.priority} />
                        }
                        <div className="flex gap-2">
                            {
                                taskTagsSplit.map((tag) => (
                                    <div key={tag} className='border-l-2 rounded-full bg-blue-100 px-1 py-0 text-xs'>{tag}</div>
                                ))
                            }
                        </div>
                    </div>
                    <button className='flex h-6 w-4 flex-shrink-0 items-center justify-center dark:text-neutral-500'>
                        <EllipsisVertical size={26} />
                    </button>
                </div>
                <div className="my-3 flex justify-between">
                    <h4 className='text-md font-bold dark:text-white'>{task.title}</h4>
                    {
                        typeof task.points === "number" && (
                            <div className='text-xs font-semibold dark:text-white'>
                                {task.points} pts
                            </div>
                        )
                    }
                </div>
                <div className="text-xs text-gray-500 dark:text-neutral-500">
                    {formattedStartDate && <span>{formattedStartDate} - </span>}
                    {formattedDueDate && <span>{formattedDueDate}</span>}
                </div>
                <p className='text-sm text-gray-600 dark:text-neutral-500'>{task.description}</p>

                <div className='mt-4 border-t border-gray-200 dark:border-stroke-dark' />

                <div className='mt-3 flex items-center justify-between'>
                    <div className="flex -space-x-[6px] overflow-hidden">
                        <Image
                            key={task.assginee?.userId}
                            src={`/${task.assginee?.profilePictureUrl!}`} //! Error
                            alt={task.assginee?.username! || "User Dp"}
                            width={30}
                            height={30}
                            className='h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-secondary'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BoardView