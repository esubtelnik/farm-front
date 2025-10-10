"use client";
// import { motion } from "framer-motion";
import { FC } from "react";
// // import img from "../../../assets/image.png";
// import img from "@/assets/image.png";
import Image from "next/image";
import { ICategory } from "@/types/entities/Product";
import { useRouter } from "next/navigation";
import routes from "@/constants/routes";
// import { useNavigate } from "react-router-dom";

interface CategoryItemProps {
   category: ICategory;
}

const CategoryItem: FC<CategoryItemProps> = ({ category }) => {
   //  const [hovered, setHovered] = useState(false);
   const router = useRouter();
   return (
      <div
         className="w-full aspect-square bg-linear-to-b from-white to-main-green  rounded-[20px] relative overflow-hidden shadow-md/30 cursor-pointer"
         //  onMouseEnter={() => setHovered(true)}
         //  onMouseLeave={() => setHovered(false)}
         onClick={() => router.push(routes.items.category(category.title))}
      >
         <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${category.paths[0]}`}
            alt={category.title}
            fill
            className="object-cover rounded-[20px] "
            unoptimized
         />

         {/* <motion.span
    animate={{ height: hovered ? "100%" : "" }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
    className="md:flex hidden absolute h-1/4 bottom-0 left-0 w-full bg-main-green/80 text-white text-xl font-bold text-center items-center justify-center break-words whitespace-normal px-3"
  >
    {category.title}
  </motion.span>

  <div className="md:hidden absolute bottom-0 left-0 w-full h-1/4 bg-main-green/80 text-white text-xs font-bold text-center flex items-center justify-center break-words whitespace-normal px-3">
    {category.title}
  </div> */}
      </div>
   );
};

export default CategoryItem;
