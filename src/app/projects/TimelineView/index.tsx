import { useAppSelector } from '@/app/redux';
import { useGetTasksQuery } from '@/state/api';
import React, { useMemo, useState } from 'react';
import { DisplayOption, ViewMode } from 'gantt-task-react'

type Props = {
    id: string;
    setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

type TaskTypeItems = "tasks" | "milestone" | "project";

const TimelineView = ({ id, setIsModalNewTaskOpen }: Props) => {

    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
    const { data: tasks, error, isLoading } = useGetTasksQuery({ projectId: Number(id) });

    const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
        viewMode: ViewMode.Month,
        locale: "en-US"
    });

    const ganttTasks = useMemo(() => {
        return (
            tasks?.map((task) => ({
                start: new Date(task.startDate as string),
                end: new Date(task.dueDate as string),
                name: task.title,
                type: "task" as "TaskType",
                progress: task.points ? (task.points / 10) * 100 : 0,
                isDisable: false
            })) || []
        )
    }, [tasks])


    if (isLoading) return <div>Loading.....</div>
    if (error) return <div>Sorry, An Error occurred.</div>

    return (
        <div>TimelineView</div>
    )
}

export default TimelineView