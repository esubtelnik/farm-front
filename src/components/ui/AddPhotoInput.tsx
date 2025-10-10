"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

interface AddPhotoInputProps {
   onChange: (files: File[]) => void;
   isEditable?: boolean;
   imageUrls?: string[];
   error?: string | null;
   images?: File[];
}

const AddPhotoInput: React.FC<AddPhotoInputProps> = ({
   onChange,
   error,
   images = [],
   isEditable,
   imageUrls = [],
}) => {
   const fileInputRef = useRef<HTMLInputElement>(null);
   const [currentIndex, setCurrentIndex] = useState(0);

   // превьюшки
   const previews = [
      ...images.map((file) => URL.createObjectURL(file)),
      ...imageUrls,
   ];

   const hasImages = previews.length > 0;
   const currentImage = hasImages ? previews[currentIndex] : null;

   // освобождаем URL-ы после размонтирования
   useEffect(() => {
      return () => {
         images.forEach((file) => URL.revokeObjectURL(file.name));
      };
   }, [images]);

   const handleClick = () => {
      fileInputRef.current?.click();
   };

   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files ? Array.from(event.target.files) : [];
      if (files.length > 0) {
         onChange([...images, ...files]);
      }
   };

   const handleRemove = (idx: number) => {
      const newFiles = [...images];
      newFiles.splice(idx, 1);
      onChange(newFiles);
      setCurrentIndex((prev) =>
         prev > 0 ? Math.min(prev - 1, newFiles.length - 1) : 0
      );
   };

   const prevImage = () => {
      setCurrentIndex((prev) => (prev === 0 ? previews.length - 1 : prev - 1));
   };

   const nextImage = () => {
      setCurrentIndex((prev) => (prev === previews.length - 1 ? 0 : prev + 1));
   };

   return (
      <div className="relative h-60 w-60 flex items-center justify-center bg-white border-2 border-main-gray rounded-lg shadow-md overflow-hidden">
         {hasImages ? (
            <>
               <Image
                  src={currentImage!}
                  alt={`Фото ${currentIndex + 1}`}
                  fill
                  className="w-full h-full object-cover rounded-lg"
               />

               {isEditable && (
                  <>
                     <button
                        type="button"
                        onClick={() => handleRemove(currentIndex)}
                        className="absolute top-2 right-2  bg-white rounded-full shadow-md p-2 text-red-500 hover:bg-red-100"
                     >
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           strokeWidth={1.5}
                           stroke="currentColor"
                           className="size-6"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18 18 6M6 6l12 12"
                           />
                        </svg>
                     </button>

                     <button
                        type="button"
                        onClick={handleClick}
                        className="absolute bottom-2 right-2 bg-white rounded-full shadow-md p-2 text-green-600 hover:bg-green-100"
                     >
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           strokeWidth={1.5}
                           stroke="currentColor"
                           className="size-6"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4.5v15m7.5-7.5h-15"
                           />
                        </svg>
                     </button>
                  </>
               )}

               {previews.length > 1 && (
                  <>
                     <button
                        type="button"
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-2 hover:bg-gray-100"
                     >
                        ‹
                     </button>
                     <button
                        type="button"
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-2 hover:bg-gray-100"
                     >
                        ›
                     </button>
                  </>
               )}
            </>
         ) : (
            <div
               onClick={handleClick}
               className={`size-full flex flex-col items-center justify-center cursor-pointer ${
                  error
                     ? "border-red-500 text-red-500"
                     : "border-main-gray text-main-gray"
               }`}
            >
               <div className="text-3xl font-semibold mb-2">+</div>
               <div className="font-bold">
                  {error ? error : "Добавить фото"}
               </div>
            </div>
         )}

         <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
         />
      </div>
   );
};

export default AddPhotoInput;
