"use client";
import { FC } from "react";
import { CheckIcon } from "@heroicons/react/24/solid"; // иконка галочки

interface CheckboxProps {
   checked: boolean;
   onChange: (checked: boolean) => void;
   label?: string;
   disabled?: boolean;
   className?: string;
}

const Checkbox: FC<CheckboxProps> = ({
   checked,
   onChange,
   label,
   disabled = false,
   className = "",
}) => {
   const handleChange = () => {
      if (!disabled) {
         onChange(!checked);
      }
   };

   return (
      <div
         className={`flex items-center gap-2 ${className} ${
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
         }`}
         onClick={handleChange}
      >
         {/* скрытый стандартный инпут */}
         <input type="checkbox" checked={checked} readOnly className="hidden" />

         {/* кастомный квадрат */}
         <div
            className={`w-5 h-5 flex bg-white items-center justify-center border-2 rounded-md transition-colors
          ${checked ? " border-main-green" : "border-gray-400 bg-white"}
          ${!disabled && "group-hover:border-main-green"}
        `}
         >
            {checked && <CheckIcon className="text-main-green" />}
         </div>

         {label && (
            <span className="text-sm text-gray-900 select-none">{label}</span>
         )}
      </div>
   );
};

export default Checkbox;
