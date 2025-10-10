import { FC, useState } from "react";
import Image from "next/image";

interface PhotoViewerProps {
   images: string[];
}

const PhotoViewer: FC<PhotoViewerProps> = ({ images }) => {
   const [currentIndex, setCurrentIndex] = useState(0);

   const prevImage = () => {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
   };

   const nextImage = () => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
   };

   return (
      <div className="relative w-full aspect-square md:w-96 md:h-96 overflow-hidden rounded-2xl">
         <Image
            key={images[currentIndex]}
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${images[currentIndex]}`}
            alt={`Photo ${currentIndex + 1}`}
            fill
            className="object-cover transition-all duration-300"
         />

         {images.length > 1 && (
            <button
               onClick={prevImage}
               className="absolute flex items-center justify-center left-2 top-1/2 bg-main-green/60 -translate-y-1/2 text-white p-2 rounded-full hover:bg-main-green"
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="size-6"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
               </svg>
            </button>
         )}
         {images.length > 1 && (
            <button
               onClick={nextImage}
               className="absolute flex items-center justify-center right-2 top-1/2 bg-main-green/60 -translate-y-1/2 text-white p-2 rounded-full hover:bg-main-green"
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="size-6"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
               </svg>
            </button>
         )}
      </div>
   );
};

export default PhotoViewer;
