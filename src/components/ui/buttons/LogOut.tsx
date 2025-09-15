import React, { FC } from 'react'

interface LogOutProps {
  onClick: () => void;
}

const LogOut:FC<LogOutProps> = ({ onClick }) => {
  return (
    <button
    onClick={onClick}
    className="flex items-center justify-between text-sm md:text-base gap-x-2 border-2 border-main-green text-white bg-main-green px-4 rounded-full py-2 h-fit hover:scale-105 transition-all duration-100 cursor-pointer"
 >
    Выйти из аккаунта
    <svg    
       xmlns="http://www.w3.org/2000/svg"
       fill="none"
       viewBox="0 0 24 24"
       strokeWidth={1.5}
       stroke="currentColor"
       className="md:size-6 size-5"
    >
       <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
       />
    </svg>
 </button>
  )
}

export default LogOut