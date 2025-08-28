"use client";
import { motion } from "framer-motion";
import { FC, useState } from "react";
// // import img from "../../../assets/image.png";
// import img from "@/assets/image.png";
import Image from "next/image";
import { ICategory } from "@/types/entities/Product";
import { useRouter } from "next/navigation";
// import { useNavigate } from "react-router-dom";

interface CategoryItemProps {
   category: ICategory;
}

const CategoryItem: FC<CategoryItemProps> = ({ category }) => {
   const [hovered, setHovered] = useState(false);
   const router = useRouter();
   return (
      <div
         className="aspect-square bg-white md:max-h-72 max-h-40 md:max-w-72 relative rounded-2xl overflow-hidden shadow-md/30 cursor-pointer"
         onMouseEnter={() => setHovered(true)}
         onMouseLeave={() => setHovered(false)}
         onClick={() =>
            router.push(
               `/category/${category.title}?image=${encodeURIComponent(
                  category.path
               )}`
            )
         }
      >
         {/* src={`${import.meta.env.VITE_API_URL}${category.path}`} */}
         {/* <Image src={`https://cdn-uploads.huggingface.co/production/uploads/${category.path}`} alt={category.title} width={1000} height={1000} className=" object-cover" /> */}
         <Image
             src={`${process.env.NEXT_PUBLIC_CDN_URL}${category.path}`}
            alt={category.title}
            width={1000}
            height={1000}
            className=" object-cover"
         />

         <motion.span
            animate={{ height: hovered ? "100%" : "" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="md:flex hidden absolute h-1/4 bottom-0 left-0 w-full bg-main-green/80 text-white text-xl font-bold text-center  items-center justify-center break-words whitespace-normal text-wrap px-3"
         >
            {category.title}
         </motion.span>
         <div className="md:hidden absolute bottom-0 left-0 w-full h-1/4 bg-main-green/80 text-white text-xs font-bold text-center flex items-center justify-center break-words whitespace-normal text-wrap px-3">
            {category.title}
         </div>
      </div>
   );
};

export default CategoryItem;
