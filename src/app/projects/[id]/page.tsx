'use client'

import React, { useState } from 'react'
import ProjectHeader from './ProjectHeader'
import BoardView from '../BoardView'
import List from '../ListView'
import TimelineView from '../TimelineView'
import TableView from '../TableView'

type Props = {
    params: {
        id: string
    }
}

const Project = ({ params }: Props) => {
    const { id } = params;
    const [activeTab, setActiveTab] = useState('Board');
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

    return (
        <div>
            {/* //TODO: Model for new task  */}

            <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
            {
                activeTab === "Board" && (
                    <BoardView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
                )
            }
            {
                activeTab === "List" && (
                    <List id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
                )
            }
            {
                activeTab === "Timeline" && (
                    <TimelineView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
                )
            }
            {
                activeTab === "Table" && (
                    <TableView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
                )
            }
        </div>
    )
}

export default Project