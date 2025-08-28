"use client";
import { FC, useRef } from "react";
import { motion } from "motion/react";
import ProducerItem from "@/components/mainComponents/items/ProducerItem";
import NextArrow from "@/components/ui/NextArrow";
import { IProducerCard } from "@/types/entities/User";

interface ProducerCarouselProps {
   producers: IProducerCard[];
   isLoading?: boolean;
}

const ProducerCarousel: FC<ProducerCarouselProps> = ({ producers, isLoading = false }) => {
   const scrollRef = useRef<HTMLDivElement>(null);
   const cardRef = useRef<HTMLDivElement>(null);

   const scroll = (direction: "left" | "right") => {
      if (scrollRef.current && cardRef.current) {
         const containerStyle = window.getComputedStyle(scrollRef.current);
         const gap = parseFloat(containerStyle.columnGap);
         const cardWidth = cardRef.current.offsetWidth + gap;
         const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
         scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
   };

   return (
      <div className="relative w-full h-min mb-24 flex md:px-5 px-2">
         <button onClick={() => scroll("left")} className="rotate-180 md:p-4 px-1">
            <NextArrow />
         </button>

         <div
            ref={scrollRef}
            className="flex overflow-x-auto md:gap-20 gap-5 overflow-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-4 "
         >
            {producers.map((producer, i) => (
               <motion.div
                  key={i}
                  ref={i === 0 ? cardRef : null}
                  whileHover={{ scale: 1.03 }}
                  className="flex-shrink-0 md:py-10 py-2"
               >
                  <ProducerItem producer={producer} />
               </motion.div>
            ))}
         </div>

         <button onClick={() => scroll("right")} className="md:p-4 px-1">
            <NextArrow />
         </button>
      </div>
   );
};

export default ProducerCarousel;
