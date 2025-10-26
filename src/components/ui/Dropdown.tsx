'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useFloating, offset, flip, shift, autoUpdate } from '@floating-ui/react-dom';
import { AnimatePresence, motion } from 'framer-motion';



interface DropdownProps {
  options: { label : string; value: string }[];
  value: string | null;
  width?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string | null;
}

const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange, placeholder, width = 'w-40', error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { x, y, refs, strategy } = useFloating({
    placement: 'bottom-start',
    middleware: [offset(2), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        ref={refs.setReference}
        onClick={() => setIsOpen(prev => !prev)}
        className={`px-2 md:px-4 py-1 ${width} border-2 ${error ? "border-red-600 text-red-600" : "border-main-gray text-dark-gray"} rounded-md bg-white text-sm shadow-sm transition-colors`}
      >
        {options.find(option => option.value === value)?.label || error || placeholder || 'Выбери...'}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            ref={refs.setFloating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              width: '100%',
              zIndex: 50,
            }}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="mt-1 max-h-40 overflow-y-auto bg-white border border-main-gray rounded-md shadow-lg text-sm md:text-base"
          >
            {options.map(option => (
              <li
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className="px-4 py-2 cursor-pointer hover:bg-main-gray/10 transition-colors text-dark-gray text-sm"
              >
                {option.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
