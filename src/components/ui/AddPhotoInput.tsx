"use client";
import React, { useRef } from "react";

interface AddPhotoInputProps {
   onChange: (file: File) => void;
   isEditable?: boolean;
   imageUrl?: string;
   error?: string | null;
   image?: File | null;
}

const AddPhotoInput: React.FC<AddPhotoInputProps> = ({
   onChange,
   error,
   image,
   isEditable,
   imageUrl,
}) => {
   const fileInputRef = useRef<HTMLInputElement>(null);

   const handleClick = () => {
      fileInputRef.current?.click();
   };

   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
         onChange(file);
      }
   };

   return (
      <>
         {image || imageUrl || isEditable ? (
            <div className="relative size-52">
               <img
                  src={image ? URL.createObjectURL(image) : imageUrl || ""}
                  alt="Изображение"
                  className="w-full h-full object-cover rounded-lg border-2 border-main-gray shadow-md"
               />
               {isEditable && (
                  <button
                     type="button"
                     className="text-main-gray absolute top-2 right-2"
                     onClick={handleClick}
                  >
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="size-6 text-main-gray cursor-pointer"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                        />
                     </svg>
                  </button>
               )}
               <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
               />
            </div>
         ) : (
            <div
               onClick={handleClick}
               className={`size-52 bg-white border-2 rounded-lg shadow-md flex flex-col items-center justify-center cursor-pointer ${
                  error ? "border-red-500" : "border-main-gray"
               }`}
            >
               <div
                  className={`text-3xl font-semibold mb-2 ${
                     error ? "text-red-500" : "text-main-gray"
                  }`}
               >
                  +
               </div>
               <div
                  className={`font-bold ${
                     error ? "text-red-500" : "text-main-gray"
                  }`}
               >
                  {error ? error : "Добавить фото"}
               </div>
               <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
               />
            </div>
         )}
      </>
   );
};

export default AddPhotoInput;
//    const handlePhotoChange = (file: File) => {
//       console.log("Файл выбран:", file.name);
//    };
