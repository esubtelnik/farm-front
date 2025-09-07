"use client";
import { FC } from "react";

import CategoryItem from "@/components/mainComponents/items/CategoryItem";
import { ICategory } from "@/types/entities/Product";
import Skeleton from "@/components/ui/Skeleton";

interface CategoryListProps {
    categories: ICategory[]
    isLoading?: boolean
}

const CategoryList: FC<CategoryListProps> = ({ categories, isLoading }) => {

   return (
      <div className="grid md:grid-cols-4 grid-cols-2 md:gap-10 gap-4 md:px-8 px-4 place-items-center mb-14">
         {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
               <Skeleton key={index} className="w-full aspect-square" />
         
            ))
         ) : (
            categories.map((category) => (
               <CategoryItem key={category.title} category={category} />
            ))
         )}

      </div>
   );
};

export default CategoryList;
