"use client";
import { FC } from "react";
//import { useLocation, useParams } from "react-router-dom";
import ProductList from "@/components/mainComponents/lists/ProductList";
import Title from "@/components/ui/Title";
import Hr from "@/components/ui/Hr";
//import Search from "@/components/ui/Search";
import { ICategory, IProductCard } from "@/types/entities/Product";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import Search from "@/components/features/Search";
interface CategoryPageProps {
   category: ICategory;
   products: IProductCard[];
   isLoading: boolean;
}

const CategoryPage: FC<CategoryPageProps> = ({
   category,
   products,
   isLoading = false,
}) => {
   // const [products, setProducts] = useState<IProductCard[]>([]);
   // const [isLoading, setIsLoading] = useState(false);
   console.log(products);

   const params = useParams();
   const searchParams = useSearchParams();
   const imageUrl = searchParams.get("image");
   const categoryTitle = decodeURIComponent(params.slug as string);

   return (
      <div className="font-geist">
       <div className="relative w-full aspect-[3/1] md:aspect-[4/1] bg-gradient-to-r from-dark-green to-main-green">
            <Image
               className="object-cover"
               src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${imageUrl}`}
               alt="Баннер"
               fill
               unoptimized
            />
         </div>

         <div
            dangerouslySetInnerHTML={{ __html: category.description }}
            className="font-roboto p-4 md:p-8 lg:p-16 text-main-gray text-justify text-sm md:text-base md:gap-y-10 gap-y-4 flex flex-col"
         ></div>
         <Hr />
         <div className="flex flex-col md:flex-row p-3 md:p-0 md:pr-12">
            <Title title={categoryTitle ?? ""} />
            <Search
               isCategoryPage={true}
               categoryTitle={categoryTitle}
               // setProducts={setProducts}
               // setIsLoading={setIsLoading}
            />
         </div>
         <ProductList products={products} isLoading={isLoading} />
      </div>
   );
};

export default CategoryPage;
