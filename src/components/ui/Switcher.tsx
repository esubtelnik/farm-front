"use client";
import { FC } from 'react'

interface SwitcherProps { 
  isChecked: boolean;
  setIsChecked: (check: boolean)=> void;
}

const Switcher:FC <SwitcherProps> = ({isChecked, setIsChecked}) => {
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  return (
    <>
      <label className='flex cursor-pointer select-none items-center'>
        <div className='relative'>
          <input
            type='checkbox'
            checked={isChecked}
            onChange={handleCheckboxChange}
            className='sr-only'
          />
          <div
            className={`box block h-8 w-14 rounded-full ${
              isChecked ? 'bg-main-green' : 'bg-light-gray'
            }`}
          ></div>
          <div
            className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white drop-shadow-lg transition ${
              isChecked ? 'translate-x-full' : ''
            }`}
          ></div>
        </div>
      </label>
    </>
  )
}

export default Switcher
