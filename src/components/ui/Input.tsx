import { FC } from "react";

type size = "small" | "normal" | "large";

interface InputProps {
   width?: string;
   placeholder: string;
   value: string;
   type?: string
   onChange: (value: string) => void;
   error?: string | null;
   onResetError?: () => void;
   size?: size;
}

const Input: FC<InputProps> = ({ width = "w-full", size = "normal", placeholder, value, onChange, error, onResetError, type }) => {
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (error && onResetError) {
         onResetError();
      }
      onChange(e.target.value);
   };

   const sizeClasses = {
      small: "py-1 px-3",
      normal: "md:py-3 md:px-7 py-2 px-5",
      large: "py-5 px-9",
   };

   return (
      <div className={width}>
      <input
         className={`w-full ${sizeClasses[size]} md:text-base text-sm border-2 ${error ? "border-red-600 placeholder:text-red-600" : "border-main-gray hover:shadow-[0_0_0_1px_#646464] focus:shadow-[0_0_0_1px_#646464]"} outline-0 rounded-full font-normal caret-main-green`}
         placeholder={error ? error : placeholder}
         value={error ? "" : value}
         type={type}
         onChange={handleChange}
      />
   </div>
   );
};

export default Input;
