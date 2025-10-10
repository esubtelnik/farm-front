"use client";
import { FC, useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import ProductInBasketItem from "../items/ProductInBasketItem";
import NextArrow from "@/components/ui/NextArrow";
import { IProductCard } from "@/types/entities/Product";

interface ProductInBasketCarouselProps {
  products: IProductCard[];
}

const ProductInBasketCarousel: FC<ProductInBasketCarouselProps> = ({ products }) => {
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
        setShowArrows(scrollRef.current.scrollWidth > scrollRef.current.clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [products]);

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center my-5 h-full">
        <span className="text-main-gray">Товары не найдены</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-min flex">
      {showArrows && (
        <button onClick={() => scroll("left")} className="rotate-180 md:p-4 px-1">
          <NextArrow  />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex overflow-x-auto md:gap-5 gap-3 overflow-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {products.map((product, i) => (
          <motion.div
            key={i}
            ref={i === 0 ? cardRef : null}
            className="flex-shrink-0 md:w-64 w-48 h-fit"
          >
            <ProductInBasketItem product={product} />
          </motion.div>
        ))}
      </div>

      {showArrows && (
        <button onClick={() => scroll("right")} className="md:p-4 px-1">
          <NextArrow />
        </button>
      )}
    </div>
  );
};

export default ProductInBasketCarousel;
