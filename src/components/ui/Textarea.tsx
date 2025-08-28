"use client";
import { FC } from "react";

interface TextareaProps {
   placeholder?: string;
   error?: string | null;
   value?: string;
   rows?: number;
   isIcon?: boolean;
   onChange?: (value: string) => void;
   onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
   onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}
const Textarea: FC<TextareaProps> = ({
   placeholder,
   error,
   value,
   rows = 8,
   isIcon = false,
   onChange,
   onBlur,
   onKeyDown,
}) => {
   return (
      <div className="relative w-full h-full">
         <textarea
            className={`w-full h-full outline-none resize-none border-2 rounded-2xl p-3 text-main-gray placeholder:font-semibold ${error ? "border-red-500 placeholder:text-red-500" : "border-main-gray placeholder:text-main-gray"}`}
            placeholder={error ? error : placeholder}
            value={value}
            rows={rows}
            onChange={(e) => onChange?.(e.target.value)}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
         />
         {isIcon && (
            <svg
               xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`size-6 ${error ? "text-red-500" : "text-main-gray"} absolute top-2 right-2`}
         >
            <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
               />
            </svg>
         )}
      </div>
   );
};

export default Textarea;
