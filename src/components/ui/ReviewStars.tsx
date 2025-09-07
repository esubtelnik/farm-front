"use client";
import { FC } from "react";

interface ReviewStarsProps {
   rating?: number;
   size?: "large" | "small";
   setRating?: (rating: number) => void;
}

const sizeClasses = {
   large: "w-5 h-5 md:w-6 md:h-6",
   small: "w-4 h-4 md:w-5 md:h-5",
};

const ReviewStars: FC<ReviewStarsProps> = ({
   rating,
   size = "large",
   setRating,
}) => {
  
   return (
      <div className="flex gap-1">
         {Array.from({ length: 5 }, (_, i) => {
            const full = i < Math.floor(rating ?? 0);
            const half =
               i === Math.floor(rating ?? 0) && rating && rating % 1 >= 0.5;

            return (
               <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={
                     full
                        ? "currentColor"
                        : half
                        ? "url(#half-gradient)"
                        : "none"
                  }
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className={`${sizeClasses[size]} ${
                     full || half ? "text-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => setRating?.(i + 1)}
               >
                  {half && (
                     <defs>
                        <linearGradient id="half-gradient">
                           <stop offset="50%" stopColor="#facc15" />
                           <stop offset="50%" stopColor="transparent" />
                        </linearGradient>
                     </defs>
                  )}
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
               </svg>
            );
         })}
      </div>
   );
};

export default ReviewStars;
