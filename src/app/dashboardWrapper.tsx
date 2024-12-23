import React, { FC } from 'react'
import Navbar from './(components)/Navbar'

interface Props {
    children: React.ReactNode
}

const DashboardWrapper: FC<Props> = ({ children }) => {
    return (
        <div className='flex min-h-screen w-full bg-gray-50'>
            {/* //TODO: Sidebar  */}
            Sidebar here
            <main className={`w-full flex flex-col bg-gray-50 dark:bg-dark-bg md:pl-64`}>
                {/* //TODO: Navbar  */}
                <Navbar />
                {children}
            </main>
        </div>
    )
}

export default DashboardWrapper