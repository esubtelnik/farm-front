import React, { FC, useState } from "react";
import Image from "next/image";
import { IProductForOrder } from "@/types/entities/Product";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

interface OrderProductItemProps {
   product: IProductForOrder;
   updateProductAmount: (productId: string | number, newAmount: number) => void;
}

const OrderProductItem: FC<OrderProductItemProps> = ({ product, updateProductAmount }) => {
   const [amount, setAmount] = useState(product.amount);
   const handleDecrement = () => {
    if (amount > 1) {
      setAmount(amount - 1);
      updateProductAmount(product.id, amount - 1);
    }
   };
   const handleIncrement = () => {
      setAmount(amount + 1);
      updateProductAmount(product.id, amount + 1);
   };
   return (
      <div className={`flex flex-col items-center justify-center border-2 rounded-md ${product.isAvailable ? "border-main-green" : "border-main-gray bg-main-gray/10"}`}>
         <div className={`relative w-full aspect-square ${product.isAvailable ? "" : "grayscale-50"}`}>
            <Image
               src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${product.image}`}
               alt={product.title}
               fill
               className="object-cover rounded-t-md"
            />
         </div>
         <div className="w-full flex flex-col items-center justify-start px-2 py-2 gap-y-2">
            <div className={`${product.isAvailable ? "text-main-green" : "text-main-gray"} font-semibold md:font-bold lg:text-xl md:text-base text-sm truncate w-full`}>
               {product.title}
            
            </div>
            <div className={`w-full flex items-center justify-between  font-semibold md:text-base text-xs ${product.isAvailable ? "text-dark-gray" : "text-main-gray"}`}>
               {amount * product.price} р.
               <span className="text-main-gray md:text-base text-[10px]">{product.isAvailable ? "" : "Нет в наличии"}</span>

               {/* <span className="text-main-gray/70 md:text-base text-[10px]">
                  /{product.amount} {product.unit}
               </span> */}
            </div>
            <div className="w-full flex items-center md:gap-x-2 gap-x-1">
               <button
                  onClick={handleDecrement}
                  className="text-main-gray border-2 border-transparent rounded-full p-1 hover:border-main-green hover:text-main-green transition-all duration-200 cursor-pointer"
               >
                  <MinusIcon className="size-4 stroke-2" />
               </button>
               <div className="text-main-gray md:text-base text-xs">
                  {amount * product.saleVolume} {product.unit}
               </div>
               <button
                  onClick={handleIncrement}
                  className="text-main-gray border-2 border-transparent rounded-full p-1 hover:border-main-green hover:text-main-green transition-all duration-200 cursor-pointer"
               >
                  <PlusIcon className="size-4 stroke-2" />
               </button>
            </div>
         </div>
      </div>
   );
};

export default OrderProductItem;
