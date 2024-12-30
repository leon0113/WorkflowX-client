import { useAppSelector } from '@/app/redux';
import Header from '@/components/Header';
import { useGetTasksQuery } from '@/state/api';
import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import clsx from 'clsx';
import { Task } from '@/types';

type Props = {
    id: string;
    setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const columns: GridColDef[] = [
    {
        field: "title",
        headerName: "Title",
        width: 100,
    },
    {
        field: "description",
        headerName: "Description",
        width: 200,
    },
    {
        field: "status",
        headerName: "Status",
        width: 130,
        renderCell: (params) => (
            <span className={clsx("inline-flex rounded-full px-2 text-xs font-semibold leading-5 text-slate-950", params.value === "Under Review" ? "bg-yellow-300" : params.value === "Work In Progress" ? "bg-green-500" : params.value === "To Do" ? "bg-blue-500" : params.value === 'Completed' ? "bg-slate-950" : "bg-gray-600")}>
                {params.value}
            </span>
        ),
    },
    {
        field: "priority",
        headerName: "Priority",
        width: 75,
    },
    {
        field: "tags",
        headerName: "Tags",
        width: 130,
    },
    {
        field: "startDate",
        headerName: "Start Date",
        width: 130,
    },
    {
        field: "dueDate",
        headerName: "Due Date",
        width: 130,
    },
    {
        field: "author",
        headerName: "Author",
        width: 150,
        renderCell: (params) => params.value?.username || "Unknown",
    },
    {
        field: "assignee",
        headerName: "Assignee",
        width: 150,
        renderCell: (params) => params.value?.username || "Unassigned",
    },
];

const TableView = ({ id, setIsModalNewTaskOpen }: Props) => {

    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
    const { data: tasks, error, isLoading } = useGetTasksQuery({ projectId: Number(id) });


    if (isLoading) return <div>Loading.....</div>
    if (error) return <div>Sorry, An Error occurred.</div>

    return (
        <div
            className='h-[540px] w-full ml-0 md:ml-5 px-4 pb-8 xl:px-6'
        >
            <div className="pt-5">
                <Header name='Task Table' isSmallText />
            </div>
            <DataGrid
                rows={tasks || []}
                columns={columns}
            />

        </div>
    )
}

export default TableView