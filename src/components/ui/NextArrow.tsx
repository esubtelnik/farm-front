"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";

interface NextArrowProps {
   route?: string;
   //    value: string;
   //    setValue: (newValue: string) => void;
}

const NextArrow: FC<NextArrowProps> = ({ route }) => {
   const router = useRouter();
   return (
      <svg
         onClick={() => {
            if (route) {
                  router.push(route);
            }
         }}
         xmlns="http://www.w3.org/2000/svg"
         fill="none"
         viewBox="0 0 24 24"
         strokeWidth={3}
         stroke="currentColor"
         className="md:size-8 sm:size-6 size-4 text-main-green md:hover:text-dark-green md:hover:border-3 hover:border-dark-green hover:rounded-full md:hover:scale-125 transition-all"
      >
         <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
         />
      </svg>
   );
};

export default NextArrow;
