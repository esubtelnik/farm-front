"use client";
import { FC } from "react";

interface RadioOption {
   label: string;
   value: string | number;
}

interface RadioGroupProps {
   name: string;

   options: RadioOption[];
   selected: string | number;
   onChange: (value: string | number) => void;
   variant?: Variant;
   groupVariant?: GroupVariant;
}

type Variant = "card" | "inline";
type GroupVariant = "vertical" | "horizontal";

const RadioButtonGroup: FC<RadioGroupProps> = ({
   name,
   options,
   selected,
   onChange,
   variant = "card",
   groupVariant = "vertical",
   }) => {
   return (
      <div className={`flex flex-col ${groupVariant === "vertical" ? "flex-col gap-3" : "flex-row gap-6"}`}>
         {options.map((option) => {
            const isSelected = selected === option.value;

            const baseClasses =
               "flex items-center gap-3 cursor-pointer transition-all duration-200";

            const cardStyles = isSelected
               ? "p-3 border rounded-full border-main-green bg-main-green/10 shadow-md"
               : "p-3 border rounded-full border-main-gray hover:border-main-green";

            const inlineStyles = "py-1";

            return (
               <label
                  key={option.value}
                  className={`${baseClasses} ${
                     variant === "card" ? cardStyles : inlineStyles
                  }`}
               >
                  <input
                     type="radio"
                     name={name}
                     value={option.value}
                     checked={isSelected}
                     onChange={() => onChange(option.value)}
                     className="hidden"
                  />
                  <div
                     className={`w-5 h-5 flex items-center justify-center rounded-full border-2 ${
                        isSelected ? "border-main-green" : "border-main-gray"
                     }`}
                  >
                     {isSelected && (
                        <div className="w-2.5 h-2.5 bg-main-green rounded-full" />
                     )}
                  </div>
                  <span className="text-gray-800">{option.label}</span>
               </label>
            );
         })}
      </div>
   );
};

export default RadioButtonGroup;
