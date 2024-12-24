import React, { FC } from 'react'
import Navbar from './(components)/Navbar'
import Sidebar from './(components)/Sidebar'

interface Props {
    children: React.ReactNode
}

const DashboardWrapper: FC<Props> = ({ children }) => {
    return (
        <div className='flex min-h-screen w-full bg-gray-50'>
            {/* Sidebar  */}
            <Sidebar />
            <main className={`w-full flex flex-col bg-gray-50 dark:bg-dark-bg md:pl-64`}>
                {/*  Navbar  */}
                <Navbar />
                {children}
            </main>
        </div>
    )
}

export default DashboardWrapper