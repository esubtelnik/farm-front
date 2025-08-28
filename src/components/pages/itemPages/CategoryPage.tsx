"use client";
import { FC } from "react";
//import { useLocation, useParams } from "react-router-dom";
import ProductList from "@/components/mainComponents/lists/ProductList";
import Title from "@/components/ui/Title";
import Hr from "@/components/ui/Hr";
//import Search from "@/components/ui/Search";
import { IProductCard } from "@/types/entities/Product";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import Search from "@/components/features/Search";

interface CategoryPageProps {
   products: IProductCard[];
   isLoading: boolean;
}

const CategoryPage: FC<CategoryPageProps> = ({ products, isLoading = false }) => {
   // const [products, setProducts] = useState<IProductCard[]>([]);
   // const [isLoading, setIsLoading] = useState(false);

   const params = useParams();
   const searchParams = useSearchParams();
   const imageUrl = searchParams.get("image");
   const categoryTitle = decodeURIComponent(params.slug as string);  
   
   return (
      <div className="font-geist">
        
         <Image
            className="w-full h-96 object-cover"
            src={`${process.env.NEXT_PUBLIC_CDN_URL}${imageUrl}`}
            alt="Баннер"
            width={1000}
            height={1000}
         />
         <div className="font-roboto p-16 text-main-gray gap-y-10 flex flex-col">
            <p>
               Фермерские продукты прямиком с поля — свежие овощи, экологичное
               мясо, домашние сыры и многое другое. Поддержите малый бизнес и
               отведайте вкус, который не сравнится с магазинными аналогами!
            </p>
            <p>
               Используйте удобные фильтры и сортировку, чтобы быстро найти то,
               что ищете. Все позиции сопровождаются описаниями, фото и
               отзывами, что поможет сделать выбор легко и осознанно.
            </p>
         </div>
         <Hr />
         <div className="flex pr-12">
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
