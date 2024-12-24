"use client"
import { LockIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const Sidebar = () => {
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);

  return (
    <div className={`fixed flex flex-col h-[100%] justify-between shadow-xl transition-all duration-300 z-40 bg-white dark:bg-black overflow-y-auto w-64 md:w-72`}>
      <div className="flex h-[100%] w-full flex-col justify-start">
        {/* //? logo n closing btn */}
        <div className="flex items-center justify-between z-50 min-h-[56px] w-64 bg-white px-6 pt-3 dark:bg-dark-bg">
          {/* logo  */}
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Workflow<span className="text-2xl font-extrabold text-gray-600 dark:text-gray-500">X</span>
          </h1>
          {/* //TODO: closing btn */}
        </div>

        {/* //? Team part */}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 dark:border-gray-700 py-4 px-8">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <div>
            <h3 className="text-lg font-bold tracking-wide dark:text-gray-200">Team Leon</h3>
            <div className="mt-1 flex items-center gap-1">
              <LockIcon className="h-3 w-3 text-gray-500 dark:text-gray-300" />
              <p className="text-xs text-gray-500 dark:text-gray-300">private</p>
            </div>
          </div>
        </div>

        {/* //? Navbar links  */}
      </div>
    </div>
  )
}

export default Sidebar;