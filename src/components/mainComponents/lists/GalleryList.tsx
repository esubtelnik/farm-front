"use client";
import { FC, useEffect, useState } from "react";
import GalleryItem from "@/components/mainComponents/items/GalleryItem";
import AddPhoto from "@/components/ui/buttons/AddPhoto";
import Skeleton from "@/components/ui/Skeleton";

interface GalleryListProps {
   images: string[];
   isEditable?: boolean;
   isLoading?: boolean;
   onAddPhoto?: (image: File) => void;
   onDeletePhoto?: (imagePath: string) => void;
}

const GalleryList: FC<GalleryListProps> = ({
   images,
   isEditable = false,
   isLoading,
   onAddPhoto,
   onDeletePhoto
}) => {
   const [loading, setLoading] = useState(isLoading || false);
   const [photoAmount, setPhotoAmount] = useState(images.length);

   useEffect(() => {
      setLoading(isLoading || false);
   }, [isLoading]);

   useEffect(() => {
      setPhotoAmount(images.length || 0);
   }, [images]);

   const handleAddPhoto = async (image: File) => {
      setPhotoAmount(photoAmount + 1);
      console.log("image", image);
      setLoading(true);
      await onAddPhoto?.(image);
      setLoading(false);
   };

   const handleDeletePhoto = async (imagePath: string) => {
      setPhotoAmount(photoAmount - 1);
      setLoading(true);
      await onDeletePhoto?.(imagePath);
      setLoading(false);
   };

   if (images.length === 0) {
      return (
         <>
            {isEditable ? (
               <AddPhoto size={'size-64'} onClick={handleAddPhoto} />
            ) : (
               <div className="flex flex-col items-center justify-center h-full">
                  <p className="text-gray-500">Нет изображений</p>
               </div>
            )}
         </>
      );
   }

   return (
      <div className="grid grid-cols-5 justify-items-center gap-5">
         {loading ?
            Array.from({ length: photoAmount }).map((_, index) => (
               <Skeleton key={index} className="size-64 rounded-md" />
            ))
         :
            images.map((image) => (
               <GalleryItem key={image} isEditable={isEditable} image={image} isLoading={loading} onDeletePhoto={handleDeletePhoto} />
            ))}
         {isEditable && <AddPhoto size={'size-64'} onClick={handleAddPhoto} />}
      </div>
   );
};

export default GalleryList;
