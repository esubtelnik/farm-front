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
         <div className="flex flex-col h-fit cursor-pointer" onClick={handleCardClick}>
            <div className="relative">
               <Image
                  width={1000}
                  height={1000}
                  src={product.image}
                  alt={product.title}
                  className="object-cover w-96 h-64 rounded-t-2xl border-2 border-main-green"
               />
               <div className="absolute z-10 top-0 right-0 p-5">
                  {!isEditable && (
                     <AddToFavourite
                        isInFavourites={isInFavourites}
                        product={product}
                        onToggle={(newState: boolean) => {
                           setIsInFavourites(newState);
                        }}
                     />
                  )}
                  {
                     isEditable && (
                        // <EditProduct productId={product.id} />
                        <div>EditProduct</div>
                     )
                  }
               </div>
            </div>
            <div className="flex flex-col border-main-green border-b-2 border-r-2 border-l-2 rounded-bl-2xl rounded-br-2xl p-3 gap-y-1 relative">
               <span className="text-main-green font-bold text-xl">
                  {product.title}
               </span>
               <span className="text-main-gray text-base">От фермера: {product.producerName}</span>
               <div className="flex gap-x-4">
                  <ReviewStars rating={product.feedbackAv} size={18} />
                  <span className="text-main-gray text-sm flex items-center">
                     Отзывы
                  </span>
               </div>
               <div className="text-main-gray text-base">
                  {product.price} руб. <span>/{product.volume} {product.unit}</span>
               </div>
               <div className="absolute z-10 bottom-0 right-0 p-5">
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
