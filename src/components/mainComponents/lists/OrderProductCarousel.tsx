import React, { FC, useEffect, useRef, useState } from "react";
import OrderProductItem from "../items/OrderProductItem";
import { IProductForOrder } from "@/types/entities/Product";
import { motion } from "motion/react";
import NextArrow from "@/components/ui/NextArrow";

interface OrderProductListProps {
   products: IProductForOrder[];
   updateProductAmount: (productId: string | number, newAmount: number) => void;
}

const OrderProductList: FC<OrderProductListProps> = ({ products, updateProductAmount }) => {
   const scrollRef = useRef<HTMLDivElement>(null);
   const cardRef = useRef<HTMLDivElement>(null);
   const [showArrows, setShowArrows] = useState(false);

   const scroll = (direction: "left" | "right") => {
      if (scrollRef.current && cardRef.current) {
         const containerStyle = window.getComputedStyle(scrollRef.current);
         const gap = parseFloat(containerStyle.columnGap) || 0;
         const cardWidth = cardRef.current.offsetWidth + gap;
         const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
         scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
   };

   useEffect(() => {
      const checkOverflow = () => {
         if (scrollRef.current) {
            setShowArrows(
               scrollRef.current.scrollWidth > scrollRef.current.clientWidth
            );
         }
      };

      checkOverflow();
      window.addEventListener("resize", checkOverflow);
      return () => window.removeEventListener("resize", checkOverflow);
   }, [products]);

   return (
      <div className="relative w-full h-min flex">
         {showArrows && (
            <button
               onClick={() => scroll("left")}
               className="rotate-180 md:px-2 px-1"
            >
               <NextArrow />
            </button>
         )}

         <div
            ref={scrollRef}
            className="flex overflow-x-auto md:gap-5 gap-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
         >
            {products.map((product, i) => (
               <motion.div
                  key={i}
                  ref={i === 0 ? cardRef : null}
                  className="flex-shrink-0 md:w-56 w-32 h-fit"
               >
                  <OrderProductItem product={product} updateProductAmount={updateProductAmount} />
               </motion.div>
            ))}
         </div>

         {showArrows && (
            <button onClick={() => scroll("right")} className="md:px-2 px-1">
               <NextArrow />
            </button>
         )}
      </div>
   );
};

export default OrderProductList;
