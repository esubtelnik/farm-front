import React, { FC } from 'react'

interface LogOutProps {
  onClick: () => void;
  className?: string;
}

const LogOut:FC<LogOutProps> = ({ onClick, className = "" }) => {
  return (
    <button
    onClick={onClick}
    className={`flex items-center justify-between text-sm md:text-base gap-x-2 border-2 border-main-green text-white bg-main-green md:px-4 px-0 rounded-full py-2 cursor-pointer ${className}`}
 >
    <svg    
       xmlns="http://www.w3.org/2000/svg"
       fill="none"
       viewBox="0 0 24 24"
       strokeWidth={2}
       stroke="currentColor"
       className="size-7"
    >
       <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
       />
    </svg>
    <span className='md:block hidden'>
    Выйти
    </span>
 </button>
  )
}

export default LogOut