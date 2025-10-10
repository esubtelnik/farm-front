import { IProductCard } from "@/types/entities/Product";
import React, { FC } from "react";
import routes from "@/constants/routes";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ReviewStars from "@/components/ui/ReviewStars";

interface ProductInBasketItemProps {
   product: IProductCard;
}

const ProductInBasketItem: FC<ProductInBasketItemProps> = ({ product }) => {
   const router = useRouter();
   const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      const target = e.target as HTMLElement;
      if (target.closest("[data-ignore-click]")) return;

      router.push(routes.items.product(product.id));
   };

   return (
      <div
         className="flex flex-col h-fit cursor-pointer w-full"
         onClick={handleCardClick}
      >
         <div className="relative flex-shrink-0">
            <div className="w-full md:h-48 lg:h-54 h-36">
               <Image
                  fill
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${product.images[0]}`}
                  alt={product.title}
                  className="object-cover rounded-t-2xl border-2 border-main-green"
               />
            </div>
         </div>
         <div className="flex flex-col w-full border-main-green border-b-2 border-r-2 border-l-2 rounded-bl-2xl rounded-br-2xl p-3 gap-y-1">
            <span className="text-main-green font-semibold md:font-bold lg:text-xl md:text-base text-sm line-clamp-3 block h-[3.75rem] md:h-[4.5rem] lg:h-[5.25rem]">
               {product.title}
            </span>
            {product.producerName && (
               <span className="text-main-gray/70 lg:text-base md:text-sm text-xs truncate block w-full my-1">
                  От <span className="hidden md:inline">фермера: </span>{" "}
                  {product.producerName}
               </span>
            )}
            <div className="flex md:gap-x-4 gap-x-2">
               <ReviewStars rating={product.feedbackAv} size="small" />
            </div>
            <div className="text-main-gray md:text-base text-xs">
               Объем: {product.saleVolume} {product.unit}
            </div>
         </div>
      </div>
   );
};

export default ProductInBasketItem;
