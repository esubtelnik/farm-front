"use client";
import { FC, useState } from "react";
import AddToCart from "@/components/ui/buttons/AddToCart";
import AddToFavourite from "@/components/ui/buttons/AddToFavourite";
import { IProductCard } from "@/types/entities/Product";

import { observer } from "mobx-react-lite";
//import EditProduct from "../../buttons/EditProduct";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ReviewStars from "@/components/ui/ReviewStars";
import routes from "@/constants/routes";
import EditProduct from "@/components/ui/buttons/EditProduct";

interface ProductItemProps {
   product: IProductCard;
   isEditable?: boolean;
}

const ProductItem: FC<ProductItemProps> = observer(
   ({ product, isEditable = false }) => {
      const router = useRouter();

      const [isInFavourites, setIsInFavourites] = useState(
         product.isInFavourites
      );
      const [isInCart, setIsInCart] = useState(product.isInCart);

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
            <div className="relative">
               <div className="lg:w-96 lg:h-64 md:w-64 md:h-48 w-36 h-32">
                  <Image
                     fill
                     src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${product.images}`}
                     alt={product.title}
                     className="object-cover rounded-t-2xl border-2 border-main-green"
                     unoptimized
                  />
               </div>
               <div className="absolute z-10 top-0 right-0 md:p-5 p-3">
                  {!isEditable && (
                     <AddToFavourite
                        isInFavourites={isInFavourites}
                        product={product}
                        onToggle={(newState: boolean) => {
                           setIsInFavourites(newState);
                        }}
                     />
                  )}
                  {isEditable && <EditProduct productId={product.id} />}
               </div>
            </div>
            <div className="flex flex-col w-full border-main-green border-b-2 border-r-2 border-l-2 rounded-bl-2xl rounded-br-2xl p-3 gap-y-1 relative">
               <span
                  className="text-main-green font-semibold md:font-bold lg:text-xl md:text-lg text-base 
                 leading-tight h-[3.6rem] md:h-[4.2rem] lg:h-[4.8rem]"
                  style={{
                     display: "-webkit-box",
                     WebkitLineClamp: 3,
                     WebkitBoxOrient: "vertical",
                     overflow: "hidden",
                     textOverflow: "ellipsis",
                  }}
               >
                 {product.title}
               </span>
               <span className="text-main-gray lg:text-base md:text-sm text-xs truncate block w-full">
                  От <span className="hidden md:inline">фермера: </span>{" "}
                  {product.producerName}
               </span>
               <div className="flex md:gap-x-4 gap-x-2">
                  <ReviewStars rating={product.feedbackAv} size="small" />
                  <span className="hidden md:flex text-main-gray lg:text-sm md:text-xs text-xs items-center">
                     Отзывы
                  </span>
               </div>
               <div className="text-main-gray text-base">
                  {product.price} руб.{" "}
                  <span>
                     /{product.saleVolume} {product.unit}
                  </span>
               </div>
               <div className="absolute z-10 bottom-0 right-0 md:p-5 p-3">
                  {!isEditable && (
                     <AddToCart
                        isInCart={isInCart}
                        product={product}
                        onToggle={(newState: boolean) => {
                           setIsInCart(newState);
                        }}
                     />
                  )}
               </div>
            </div>
         </div>
      );
   }
);

export default ProductItem;
