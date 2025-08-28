"use client";
import { FC, useRef } from "react";

interface AddPhotoProps {
  onClick: (image: File) => void;
  size?: string;
}

const AddPhoto: FC<AddPhotoProps> = ({ onClick, size='h-full w-full' }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onClick(file);
    }
    fileInputRef.current!.value = "";
  };

  return (
    <>
      <button
        onClick={handleButtonClick}
        type="button"
        className={`group flex flex-col items-center justify-center ${size} border-2 border-main-gray text-main-gray rounded-md cursor-pointer gap-y-2`}
      >
        <span className="text-base font-bold transition-transform duration-200 group-hover:scale-115">
          Добавить фото
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-6 transition-transform duration-200 group-hover:scale-135"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </>
  );
};

export default AddPhoto;
